import LocalizedStrings from 'react-localization';

let strings = new LocalizedStrings({
    en:{
        commentsL:"Lawyer's Comments",
        commentsR:"Reviewer's Comments",
        accept:"Accept The Case",
        reject:"Reject The Case",
        comments:"Add Comments",
        reviewerP:"In Progress Reviewer",
        title:"Your Cases",
        sortB:"Sort The Cases",
        id:"By ID",
        date:"By Creation Date"
    },
    ar:{
        commentsL:"تعليقات المحامي",
        commentsR:"تعليقات المتابع",
        accept:"اقبل الاستمارة",
        reject:"ارفض الاستمارة",
        comments:"ضع تعليقا",
        reviewerP:"المتابع يعمل عليها",
        title:"قضاياك",
        sortB:"رتب القضايا",
        id:"برقم تعريفها",
        date:"بتاريخ انشاءها"
    }
});

export default strings