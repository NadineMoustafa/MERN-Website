import LocalizedStrings from 'react-localization';

let strings = new LocalizedStrings({
    en:{
        title:"Your Profile",
        alert:"Password updated Successfully",
        labelNew:"New Password",
        labelConfirm:"Confirm Password",
        labelSubmit:"Submit",
        labelOld:"Old Password",
        valid:"Note: It should be more than 8 characters and less than 20 characters"
    },
    ar:{
        title:"ملفك الشخصي",
        alert:"تم تحديث كلمة السر بنجاح",
        labelNew:"كلمة السر الجديدة",
        labelConfirm:"تأكيد كلمة السر",
        labelSubmit:"تسجيل",
        labelOld:"كلمة السر القديمة",
        valid:"ملاحظة: يجب أن يكون أكثر من 8 أحرف وأقل من 20 حرفًا"
    }
});
export default strings