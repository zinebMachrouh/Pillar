<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Welcome to Pillar</title>
</head>
<body>
    <p>Hello {{ $name }},</p>
    
    <p>Welcome to Pillar! Your account has been successfully created.</p>
    
    <p>Here are your login credentials:</p>
    <ul>
        <li><strong>Email:</strong> {{ $email }}</li>
        <li><strong>Password:</strong> {{ $password }}</li>
    </ul>
    
    <p>You can now log in to your account using the provided credentials.</p>
    
    <p>Thank you for joining us!</p>
    
    <p>Best regards,</p>
    <p>Pillar Team</p>
</body>
</html>
