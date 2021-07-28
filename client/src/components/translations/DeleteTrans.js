import LocalizedStrings from 'react-localization';

let strings = new LocalizedStrings({
	en: {
        Delete:"Are you sure you want to delete this form?",
        Cancel:"Cancel",
        deleteB:"Delete",
    },
    ar: {
        Delete:"هل أنت متأكد أنك تريد حذف هذا النموذج؟" ,
        Cancel:"إلغاء" ,
        deleteB:"حذف"
    }
});
export default strings;