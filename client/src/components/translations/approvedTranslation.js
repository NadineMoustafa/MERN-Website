import LocalizedStrings from 'react-localization';

let strings = new LocalizedStrings({
    en:{
      title:"Your Approved Companies",
       name:"Company's Name",
       nameInEnglish:"Company's Name In English",
       governorate:"Company's Governorate",
       city:"Company's City",
       address:"Company's Address",
       telephone:"Company's Telephone",
       fax:"Company's Fax",
       currency:"Company's Currency",
       capital:"Company's Capital",
       type:"Company's Type",
       date:"Company's Creation Date"
    },
    ar: {
       title:"الشركات المقبولة",
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