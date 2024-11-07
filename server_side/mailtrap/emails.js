import {
  PASSWORD_RESET_REQUEST_TEMPLATE,
  PASSWORD_RESET_SUCCESS_TEMPLATE,
  VERIFICATION_EMAIL_TEMPLATE,
} from "./emailTemplates.js";
import { mailTrapClient, sender } from "./mailtrap.config.js";

// ------------------------------------Send Verification Email------------------------------------------

export const sendVerificationEmail = async (email, verificationToken) => {
  const recipient = [{ email }];

  try {
    const response = await mailTrapClient.send({
      from: sender,
      to: recipient,
      subject: "Varify your email!",
      html: VERIFICATION_EMAIL_TEMPLATE.replace(
        "{verificationCode}",
        verificationToken
      ),
      category: "Email Verification",
    });
    console.log("email sent successfully", response);
  } catch (error) {
    console.log("error sending verification email", error);
    throw new Error(`Error sending email : ${error}`);
  }
};

// -----------------------------------------------Send Welcome Email-------------------------------------------------------------

export const sendWelcomeEmail = async (email, name) => {
  const recipient = [{ email }];
  try {
    const response = await mailTrapClient.send({
      from: sender,
      to: recipient,
      template_uuid: "9fbd026e-988d-4211-91f9-eb0711a44486",
      template_variables: {
        company_info_name: "Online Notary",
        name: name,
      },
    });
    console.log("welcome email sent successfully ", response);
  } catch (error) {
    console.log("Error sending welcome email", error);
    throw new Error("Error sending welcome email", error);
  }
};

//------------------------------------------ Send Reset pasword Email-----------------------------------------------------------

export const sendPasswordResetEmail = async (email, resetURL) => {
  const recipient = [{ email }];
  try {
    const response = await mailTrapClient.send({
      from: sender,
      to: recipient,
      subject: "Reset your password",
      html: PASSWORD_RESET_REQUEST_TEMPLATE.replace("{resetURL}", resetURL),
      category: "Password Reset",
    });
  } catch (error) {
    console.error("Error sending password reset email", error);
    throw new Error("Error sending password email", error);
  }
};

// ---------------------------------------- Send Reset password successfully message ------------------------------------------

export const sendResetSuccessEmail = async (email) => {
  const recipient = [{ email }];
  try {
    const response = await mailTrapClient.send({
      from: sender,
      to: recipient,
      subject: "Password reset successfully",
      html: PASSWORD_RESET_SUCCESS_TEMPLATE,
      category: "Password Reset",
    });
    console.log("Successful password changing mail sent successfully");
  } catch (error) {
    console.error("Error in sending successful password reset email", error);
    throw new Error(
      `Error in sending successful password reset email ${error}`
    );
  }
};
