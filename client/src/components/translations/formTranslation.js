import LocalizedStrings from 'react-localization';

let strings = new LocalizedStrings({
    en:{
        title:"Create Your Company",
        choose:"Choose The Type of Your Company",
        sscform:"Single Shareholder Company (SSC)",
        spcform:'Sole Proprietorship Company (SPC)',
        otherform:"Other Type"
    },
    ar:{
        title:"انشأ شركتك",
        choose:"اختر نوع شركتك",
        sscform:"شركة مساهم واحد",
        spcform:'شركة ملكية فردية',
        otherform:"نوع اخر"
    }
});

export default strings