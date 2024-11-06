import { VERIFICATION_EMAIL_TEMPLATE } from "./emailTemplates.js";
import { mailTrapClient, sender } from "./mailtrap.config.js";

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

// Send Welcome Email-------------------------------------------------------------------------------------

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
