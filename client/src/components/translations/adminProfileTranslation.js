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
	fax:"Fax"
    },
    ar:{
        gender:"الجنس",
	birthdate:"تاريخ الميلاد",
	nationality:"الجنسية",
	identificationType:"نوع تعريف الهوية",
	identificationNumber:"رقم الهوية",
	address:"العنوان",
	telephone:"التليفون",
	fax:"الفاكس"
    }
});
export default strings