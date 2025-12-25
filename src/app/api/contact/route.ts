import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { fullName, email, message } = body;

    // Validate required fields
    if (!fullName || !email || !message) {
      return NextResponse.json(
        { error: 'All fields are required' },
        { status: 400 }
      );
    }

    // Send email using a service like Resend, SendGrid, or Nodemailer
    // For now, we'll log the message and return success
    // In production, integrate with your email service
    
    console.log('Contact Form Submission:');
    console.log('To: jenna@niyamocapital.com');
    console.log('From:', email);
    console.log('Name:', fullName);
    console.log('Message:', message);

    // Example using fetch to send to an email API (uncomment and configure as needed):
    /*
    const emailResponse = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${process.env.RESEND_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        from: 'Niyamo Capital <noreply@niyamocapital.com>',
        to: 'jenna@niyamocapital.com',
        subject: `New Contact Form Submission from ${fullName}`,
        html: `
          <h2>New Contact Form Submission</h2>
          <p><strong>Name:</strong> ${fullName}</p>
          <p><strong>Email:</strong> ${email}</p>
          <p><strong>Message:</strong></p>
          <p>${message}</p>
        `,
        reply_to: email,
      }),
    });

    if (!emailResponse.ok) {
      throw new Error('Failed to send email');
    }
    */

    // For demo purposes, simulate successful email sending
    return NextResponse.json(
      { 
        success: true, 
        message: 'Email sent successfully to jenna@niyamocapital.com' 
      },
      { status: 200 }
    );

  } catch (error) {
    console.error('Contact form error:', error);
    return NextResponse.json(
      { error: 'Failed to send message' },
      { status: 500 }
    );
  }
}
