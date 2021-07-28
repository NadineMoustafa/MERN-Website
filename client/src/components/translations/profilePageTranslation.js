import LocalizedStrings from 'react-localization';

let strings = new LocalizedStrings({
    en:{
        gender:"Gender",
	birthdate:"Birthdate",
	nationality:"Nationality",
	identificationType:"Identification Type",
	identificationNumber:"Identification Number",
	address:"Address",
	telephone:"Telephone",
	fax:"Fax",
	financialBalance:"Financial Balance"
    },
    ar:{
        gender:"الجنس",
	birthdate:"تاريخ الميلاد",
	nationality:"الجنسية",
	identificationType:"نوع تعريف الهوية",
	identificationNumber:"رقم الهوية",
	address:"العنوان",
	telephone:"التليفون",
	fax:"الفاكس",
	financialBalance:"الرصيد المالي"
    }
});
export default strings