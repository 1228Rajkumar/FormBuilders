import java.util.*;

import javax.mail.*;
import javax.mail.internet.InternetAddress;
import javax.mail.internet.MimeMessage;

public class MailChecker {
    private static String otp(){
            int len = 5;
            String numbers = "123456789";
            Random rndm_method = new Random();
            char[] otp = new char[len];
            for (int i = 0; i < len; i++) {
                otp[i] = numbers.charAt(rndm_method.nextInt(numbers.length()));
            }
            return String.valueOf(otp);
            
    }
    public static String send_Otp_Mail(String to, String type) {
        final String from = "formbuilders004@gmail.com";
        final String username = "formbuilders004@gmail.com";
        final String password = "bjxusiqgdjfhndyf";
        String host = "smtp.gmail.com";
        Properties props = new Properties();
        props.put("mail.smtp.auth", "true");
        props.put("mail.smtp.starttls.enable", "true");
        props.put("mail.smtp.host", host);
        props.put("mail.smtp.port", "587");

        // Get the Session object.
        Session session = Session.getInstance(props,
                new javax.mail.Authenticator() {
                    protected PasswordAuthentication getPasswordAuthentication() {
                        return new PasswordAuthentication(username, password);
                    }
                }
        );
        try {
        	String OTP = otp();
            Message message = new MimeMessage(session);
            message.setFrom(new InternetAddress(from));
            message.setRecipients(Message.RecipientType.TO,InternetAddress.parse(to));
            message.setSubject("FormBuilders Free to create ");
            
            message.setContent("<p style='font-size:1rem;'>To verify your email address, please use the following One Time Password (OTP):</p> <h1 style='text-align:center;'>" + OTP +"</h1>"+"<p style='font-size:0.6rem;'>Do not share this OTP with anyone. FormBuilders takes your account security very seriously. FormBuilders Customer Service will never ask you to disclose or verify your FormBuilders password, OTP. If you receive a suspicious email with a link to update your account information, do not click on the link! Instead, report the email to FormBuilders for investigation.</p><br><p style='font-size:1rem;'>Thank You!</p>"
            ,"text/html");
            Transport.send(message);
            return OTP;
        } catch (MessagingException e) {
            e.printStackTrace();
            return "";
        }
    }
    
    public static void send_Pass_Mail(String to, String type, String pass) {
        final String from = "formbuilders004@gmail.com";
        final String username = "formbuilders004@gmail.com";
        final String password = "bjxusiqgdjfhndyf";
        // Setting up the port to send mail through gmail server
        String host = "smtp.gmail.com";
        Properties props = new Properties();
        props.put("mail.smtp.auth", "true");
        props.put("mail.smtp.starttls.enable", "true");
        props.put("mail.smtp.host", host);
        props.put("mail.smtp.port", "587");

        // Get the Session object.
        Session session = Session.getInstance(props,
                new javax.mail.Authenticator() {
                    protected PasswordAuthentication getPasswordAuthentication() {
                        return new PasswordAuthentication(username, password);
                    }
                }
        );
        try {
            Message message = new MimeMessage(session);
            message.setFrom(new InternetAddress(from));
            message.setRecipients(Message.RecipientType.TO,InternetAddress.parse(to));
            message.setSubject("FormBuilders Free to create ");
            
            message.setContent("<p style='font-size:1rem;'>This is your Old Password:</p> <h1 style='text-align:center;'>" +pass+"</h1>"+"<p style='font-size:0.6rem;'>Do not share your password with anyone. FormBuilders takes your account security very seriously. FormBuilders Customer Service will never ask you to disclose or verify your FormBuilders password. If you receive a suspicious email with a link to update your account information, do not click on the link! Instead, report the email to FormBuilders for investigation.</p><br><p style='font-size:1rem;'>Thank You!</p>"
            ,"text/html");
            Transport.send(message);
        } catch (MessagingException e) {
            e.printStackTrace();
        }
    }

}
