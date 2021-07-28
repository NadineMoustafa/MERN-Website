import LocalizedStrings from 'react-localization';

let strings = new LocalizedStrings({
    en:{
        hover: "Press here to show info",
        title:"Electronic Journal",
        name:"Name",
        nameInEnglish:"Name In English",
        governorate:"Governorate",
        city:"City",
        address:"Address",
        telephone:"Telephone",
        fax:"Fax",
        currency:"Currency",
        capital:"Capital",
        type:"Type",
        date:"Creation Date"
    },
    ar:{
        hover: "اضغط هنا لرؤية المعلومات",
        title:"الجريدة الالكترونية",
       name:"اسم الشركة",
       nameInEnglish:"اسم الشركة بالإنجلیزیة",
       governorate:"المحافظة",
       city:"المدینة",
       address:"العنوان",
       telephone:"التلیفون",
       fax:"الفاكس",
       currency:"عملة رأس المال",
       capital:"رأس المال",
       type:"نوع الشركة",
       date:"تاريخ الإنشاء"
    }
});

export default strings