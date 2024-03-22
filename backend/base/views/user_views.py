from django.shortcuts import render
from rest_framework.decorators import api_view, permission_classes
from rest_framework.response import Response
from base.models import Contact
from rest_framework.views import APIView
from base.serializer import ContactSerializer, UserSerializer, UserSerializerWithToken, MyTokenObtainPairSerializer

from rest_framework.permissions import IsAuthenticated, IsAdminUser
from django.contrib.auth.models import User

from django.contrib.auth.hashers import make_password
from rest_framework import status

from rest_framework_simplejwt.views import TokenObtainPairView


class MyTokenObtainPairView(TokenObtainPairView):
    serializer_class = MyTokenObtainPairSerializer

@api_view(['GET'])
def getUserProfile(request):
    user = request.user
    serializer = UserSerializer(user, many=False)
    return Response(serializer.data)


@api_view(['PUT'])
@permission_classes([IsAuthenticated])
def updateUserProfile(request):
    user = request.user
    serializer = UserSerializerWithToken(user, many=False)
    data = request.data
    print(data)
    user.first_name = data['name']
    user.email = data['email']
    

    if data['password'] != '':
        user.password = make_password(data['password'])
    user.save()
    return Response(serializer.data)

@api_view(['GET'])
@permission_classes([IsAdminUser])
def getUsers(request):
    users = User.objects.all()
    serializer = UserSerializer(users, many=True)
    return Response(serializer.data)


@api_view(['POST'])
def registerUser(request):
    data = request.data
    try:
        user = User.objects.create(
            first_name=data.get('name'),
            username=data.get('email'),
            email=data.get('email'),
            password=make_password(data.get('password')),
        )

        serializer = UserSerializerWithToken(user, many=False)
        return Response(serializer.data)
    except:
        message = {'detail': 'User with this email already exists'}
        return Response(message, status=status.HTTP_400_BAD_REQUEST)

class ContactView(APIView):
    def post(self, request):
        serializer = ContactSerializer(data=request.data)
        if serializer.is_valid():
            # Save the contact form data to the database
            serializer.save()

            # Send email using Util class directly
            Util.send_email({
                'email_subject': 'New Contact Form Submission',
                'email_body': f"You have received a new contact form submission:\n\nName: {serializer.data['name']}\nEmail: {serializer.data['email']}\nSubject: {serializer.data['subject']}\nMessage: {serializer.data['message']}",
                'to_email': serializer.data['email'],  # Use the email provided in the contact form data
            })

            return Response({'message': 'Contact form submitted successfully'}, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)