/**
 * AIROX 2026 - Official Registration Service
 * Communicates directly with the deployed Google Apps Script Web App API endpoint.
 */

import { RegistrationFormData } from '../types';

export interface SubmissionResult {
  success: boolean;
  message: string;
  registrationId?: string;
  timestamp?: string;
}

export const APPS_SCRIPT_ENDPOINT =
  'https://script.google.com/macros/s/AKfycbwwy-QjVtCtRBzkbF6Zpmuw_Vb6Y19tIVvCu7yc9rfdZ3s9PgpdYuvh_RCCzstqUpCi/exec';

/**
 * Converts a File object to a Base64 Data URL string
 */
export function fileToBase64(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = (error) => reject(error);
    reader.readAsDataURL(file);
  });
}

/**
 * Submits registration data directly to the Apps Script Web App endpoint.
 */
export async function submitRegistration(data: RegistrationFormData): Promise<SubmissionResult> {
  try {
    // 1. Validate that the payment screenshot File object is present
    if (!data.paymentScreenshot) {
      return {
        success: false,
        message: 'Payment screenshot is required.',
      };
    }

    const file = data.paymentScreenshot;

    // 2. Convert the File object to Base64 Data URL
    const paymentScreenshotBase64 = await fileToBase64(file);

    // 3. Construct the payload with the paymentScreenshot object containing data, name, and type
    const payload = {
      fullName: data.fullName,
      email: data.email,
      phone: data.phone,
      mobileNumber: data.phone,
      college: data.collegeName,
      collegeName: data.collegeName,
      yearOfStudy: data.yearOfStudy,
      major: (data.major === 'Others' || data.major === 'Other') ? (data.majorOther || data.major) : data.major,
      majorOther: (data.major === 'Others' || data.major === 'Other') ? (data.majorOther || '') : '',
      department: (data.department === 'Other' || data.department === 'Others') ? (data.departmentOther || data.department) : data.department,
      departmentOther: (data.department === 'Other' || data.department === 'Others') ? (data.departmentOther || '') : '',
      participationType: data.participationType,
      teamName: data.participationType === 'Team' ? data.teamName : '',
      technicalEvents: data.technicalEvents,
      nonTechnicalEvents: data.nonTechnicalEvents,
      utrNumber: data.utrNumber || 'N/A',
      utr: data.utrNumber || 'N/A',
      paymentScreenshot: {
        data: paymentScreenshotBase64,
        name: file.name || 'payment_screenshot.jpg',
        type: file.type || 'image/jpeg',
      },
    };

    // Use Content-Type: text/plain;charset=utf-8 to avoid CORS preflight OPTIONS request on Apps Script endpoints
    const response = await fetch(APPS_SCRIPT_ENDPOINT, {
      method: 'POST',
      headers: {
        'Content-Type': 'text/plain;charset=utf-8',
      },
      body: JSON.stringify(payload),
    });

    if (!response.ok) {
      const errorText = await response.text().catch(() => '');
      return {
        success: false,
        message: `HTTP Error ${response.status}: ${errorText || 'Failed to submit registration.'}`,
      };
    }

    const result = await response.json();

    if (result && result.success) {
      return {
        success: true,
        message: result.message || 'Registration submitted successfully.',
        registrationId: result.registrationId,
        timestamp: new Date().toISOString(),
      };
    } else {
      let failureMessage = result?.message || 'Registration failed. Please check your form details and try again.';
      if (failureMessage.includes('UTR / UPI Reference No.')) {
        failureMessage += ' (Note for Admin: Please ensure row 1 of your Google Sheet includes the column header "UTR / UPI Reference No.")';
      }
      return {
        success: false,
        message: failureMessage,
      };
    }
  } catch (error: any) {
    console.error('Registration API Submission Error:', error);
    return {
      success: false,
      message: error?.message || 'Network communication error. Please try again.',
    };
  }
}
