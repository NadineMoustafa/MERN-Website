import LocalizedStrings from 'react-localization';

let strings = new LocalizedStrings({
    en:{
      title:"Forgot Password",
      email:"Email",
      emailPlace:"Please Enter Your Email",
      send:"Send Password Reset Email",
      valid:"You must insert an email",
      valid2:"That email address is not recognized. Please try again or register for a new account.",
      valid3:"Password reset email was successfully sent"
    },
    ar:{
        title:"هل نسيت كلمة السر؟",
      email:"البريد الإلكتروني",
      emailPlace:"برجاء ادخال البريد الالكتروني",
      send:"إرسال كلمة السر لإعادة تعيين البريد الإلكتروني",
      valid:"عليك ادخال بريد الكتروني",
      valid2:"عنوان البريد الإلكتروني هذا غير معروف. يرجى المحاولة مرة أخرى أو التسجيل للحصول على حساب جديد.",
      valid3:"تم إرسال البريد الإلكتروني لإعادة تعيين كلمة السر بنجاح"
    }
});

export default strings