const express = require('express');
const Joi = require('joi');
const router = express.Router();
const dynamicFormController = require('../../controllers/dynamicFormController');
const userController = require('../../controllers/userController');
const User = require('../../models/User');
const Admin = require('../../models/Admin');
const validator = require('../../validations/userValidations');
const notifications = require('../../helpers/notifications');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const tokenKey = require('../../config/keys_dev').secretOrKey;
const passport = require('passport');
require('../../config/passport')(passport);
const axios = require('axios');

//sort all forms for a  by form creation date
router.get('/AllformsSortedByformDate/', passport.authenticate('jwt', { session: false }), async (req, res) => {
	if (req.user.userType === 'Lawyer' || req.user.userType === 'Reviewer') {
		var forms = await dynamicFormController.search();
		if (forms.error) return res.status(400).json({ error: forms.error });
		forms.sort(userController.compareByDate);
		return res.json({ data: forms });
	} else {
		return res.status(401).json({ msg: 'Non Authorized' });
	}
});

//sort all forms by id as a lawyer
router.get('/AllFormSortedByFormId/', passport.authenticate('jwt', { session: false }), async (req, res) => {
	// sort all forms by form id
	if (req.user.userType === 'Lawyer' || req.user.userType === 'Reviewer') {
		const forms = await dynamicFormController.search();
		if (forms.error) return res.status(400).json({ error: forms.error });
		forms.sort(userController.compareById);
		return res.json({ data: forms });
	} else {
		return res.status(401).json({ msg: 'Non Authorized' });
	}
});

//sort by form creation date for a specific user
router.get('/SpecificformsSortedByformDate', passport.authenticate('jwt', { session: false }), async (req, res) => {
  const userid = req.user.id;
  var inProgressForms = [];
	if (req.user.userType === 'Lawyer') {
		var forms = await dynamicFormController.search('lawyerId', userid);
		
		for (i = 0; i < forms.length; i++) {
			if (forms[i].status === 'In progress Lawyer' || forms[i].status==='Reviewer rejected') inProgressForms.push(forms[i]);
		}
		if (inProgressForms.error) return res.status(400).json({ error: forms.error });
		inProgressForms.sort(userController.compareByDate);
		return res.json({ data: inProgressForms });
	} else if (req.user.userType === 'Reviewer') {
		var forms = await dynamicFormController.search('reviewerId', userid);
		for (i = 0; i < forms.length; i++) {
			if (forms[i].status === 'In progress Reviewer') inProgressForms.push(forms[i]);
		}
		if (inProgressForms.error) return res.status(400).json({ error: forms.error });
		inProgressForms.sort(userController.compareByDate);
		return res.json({ data: inProgressForms });
	} else {
		return res.status(401).json({ msg: 'Non Authorized' });
	}
});

//sort specific forms by id as a lawyer
router.get('/SpecificFormSortedByFormId', passport.authenticate('jwt', { session: false }), async (req, res) => {
  const userid = req.user.id;
  var inProgressForms = [];
	if (req.user.userType === 'Lawyer') {
		var forms = await dynamicFormController.search('lawyerId', userid);
		
		for (i = 0; i < forms.length; i++) {
			if (forms[i].status === 'In progress Lawyer' || forms[i].status==='Reviewer rejected') inProgressForms.push(forms[i]);
		}
		if (inProgressForms.error) return res.status(400).json({ error: forms.error });
		inProgressForms.sort(userController.compareById);
		return res.json({ data: inProgressForms });
	} else if (req.user.userType === 'Reviewer') {
		var forms = await dynamicFormController.search('reviewerId', userid);
		for (i = 0; i < forms.length; i++) {
			if (forms[i].status === 'In progress Reviewer') inProgressForms.push(forms[i]);
		}
		if (inProgressForms.error) return res.status(400).json({ error: forms.error });
		inProgressForms.sort(userController.compareById);
		return res.json({ data: inProgressForms });
	} else {
		return res.status(401).json({ msg: 'Non Authorized' });
	}
});

//Get an investor's in Progress cases "Track my cases"
// Ammar's bar for progress !!!!!
router.get('/getInvestorInProgressCases/', passport.authenticate('jwt', { session: false }), async (req, res) => {
	const userid = req.user.id;
	if (req.user.userType === 'Investor') {
		var forms = await dynamicFormController.search('investorId', userid);
		if (forms.error) return res.status(400).json({ error: forms.error });
		var inProgressForms = [];
		for (i = 0; i < forms.length; i++) {
			if (forms[i].status !== 'Approved') inProgressForms.push(forms[i]);
		}
		return res.json({ data: inProgressForms });
	} else {
		return res.status(401).json({ msg: 'Non Authorized' });
	}
});

//Get an investor rejected case from lawyer "Lawyer added comments"
router.get('/getInvestorLawyerRejectedCases', passport.authenticate('jwt', { session: false }), async (req, res) => {
	const userid = req.user.id;
	if (req.user.userType === 'Investor') {
		var forms = await dynamicFormController.search('investorId', userid);
		if (forms.error) return res.status(400).json({ error: forms.error });
		var lawyerRejectedForms = [];
		for (i = 0; i < forms.length; i++) {
			if (forms[i].status === 'Lawyer rejected') lawyerRejectedForms.push(forms[i]);
		}
		return res.json({ data: lawyerRejectedForms });
	} else {
		return res.status(401).json({ msg: 'Non Authorized' });
	}
});

//Get Unassigned Cases for Lawyer to pick one from or the reviewer rejected (added comments) ones even if it wasn't his
router.get('/getLawyerPossiblePicks', passport.authenticate('jwt', { session: false }), async (req, res) => {
	const userid = req.user.id;
	if (req.user.userType === 'Lawyer') {
		var forms = await dynamicFormController.search();
		if (forms.error) return res.status(400).json({ error: forms.error });
		var lawyerPicks = [];
		for (i = 0; i < forms.length; i++) {
			if (forms[i].status === 'Unassigned') lawyerPicks.push(forms[i]);  // || forms[i].status === 'Reviewer rejected'
		}
		return res.json({ data: lawyerPicks });
	} else {
		return res.status(401).json({ msg: 'Non Authorized' });
	}
});

//The lawyer's in Progress Cases
router.get('/getLawyerInProgressCases', passport.authenticate('jwt', { session: false }), async (req, res) => {
	const userid = req.user.id;
	if (req.user.userType === 'Lawyer') {
		var forms = await dynamicFormController.search('lawyerId', userid);
		if (forms.error) return res.status(400).json({ error: forms.error });
		var lawyerInProgressForms = [];
		for (i = 0; i < forms.length; i++) {
			if (forms[i].status === 'In progress Lawyer' || forms[i].status==='Reviewer rejected') lawyerInProgressForms.push(forms[i]);
		}
		return res.json({ data: lawyerInProgressForms });
	} else {
		return res.status(401).json({ msg: 'Non Authorized' });
	}
});

//The Reviewer's possible picks "Lawyer Accepted"
router.get('/getReviewerPossiblePicks', passport.authenticate('jwt', { session: false }), async (req, res) => {
	const userid = req.user.id;
	if (req.user.userType === 'Reviewer') {
		var forms = await dynamicFormController.search();
		if (forms.error) return res.status(400).json({ error: forms.error });
		var reviewerPicks = [];
		for (i = 0; i < forms.length; i++) {
			if (forms[i].status === 'Lawyer accepted') reviewerPicks.push(forms[i]);
		}
		return res.json({ data: reviewerPicks });
	} else {
		return res.status(401).json({ msg: 'Non Authorized' });
	}
});

//The Reviewer's in Progress Cases
router.get('/getReviewerInProgressCases', passport.authenticate('jwt', { session: false }), async (req, res) => {
	const userid = req.user.id;
	if (req.user.userType === 'Reviewer') {
		var forms = await dynamicFormController.search('reviewerId', userid);
		if (forms.error) return res.status(400).json({ error: forms.error });
		var reviewerInProgressForms = [];
		for (i = 0; i < forms.length; i++) {
			if (forms[i].status === 'In progress Reviewer') reviewerInProgressForms.push(forms[i]);
		}
		return res.json({ data: reviewerInProgressForms });
	} else {
		return res.status(401).json({ msg: 'Non Authorized' });
	}
});

router.post('/CreatingForm', passport.authenticate('jwt', { session: false }), async (req, res) => {
	const userid = req.user.id;

    if (req.user.userType === "Investor") {
      console.log(req.body)
      var newForm = await dynamicFormController.create(
        req.body,
        "Unassigned",
        userid,
        null
      );
      console.log(newForm)
      if (newForm.error) return res.status(400).json({ error: newForm.error });
      return res.json({ data: newForm });
    } else if (req.user.userType === "Lawyer") {
      var newForm = await dynamicFormController.create(
        req.body,
        "Lawyer accepted",
        null,
        userid
      );
      if (newForm.error) return res.status(400).json({ error: newForm.error });
      return res.json({ data: newForm });
    } else {
      return res.status(401).json({ msg: "Non Authorized" });
    }
  }
);

//Calculating fees as a lawyer
router.put(
  "/CalculatingFees/:formId",
  passport.authenticate("jwt", { session: false }),
  async (req, res) => {
    if (req.user.userType === "Lawyer") {
      var equation = await axios.get(
        "http://localhost:5000/routes/api/fakeServer/ReturningEquation"
      );
      //console.log(equation);
      const formid = req.params.formId;
      var form = await dynamicFormController.search("_id", formid);
      form=form[0].toJSON()
      if (form.error) return res.status(400).json({ error: form.error });
      var capital = form.equityCapital;
      //console.log(form)
      //console.log(capital)
      var calculatedFees =
      equation.data.data.m * capital + equation.data.data.c;
     // console.log(calculatedFees)
      const returnedFees = calculatedFees;
      form.fees = returnedFees;
      const updatedForm = await dynamicFormController.update("_id", formid, form);
      if (updatedForm.error)
        return res.status(400).json({ error: updatedForm.error });
      var investor = await userController.search("_id", form.investorId);
      if(investor!==null){
      if (investor.error)
        return res.status(400).json({ error: investor.error });
      var notifyUser = await notifications.notifyUserForFormUpdates(
        investor,
        updatedForm
      );
      return res.json({
        msg: "Fees Calculated Successfully",
        data: updatedForm,
        notifications: notifyUser
      });
    }
    } else {
      return res.status(401).json({ msg: "Non Authorized" });
    }
  }
);

//Lawyer or Reviewer accepting form (Updating Financial balance of Investor in case of reviewer)

router.put(
  "/accept/:formId",
  passport.authenticate("jwt", { session: false }),
  async (req, res) => {
    if (req.user.userType === "Lawyer") {
      const formid = req.params.formId;
      var form = await dynamicFormController.search("_id", formid);
      if (form.error) return res.status(400).json({ error: form.error });
      form=form[0].toJSON()
     // console.log(form.status)
     // console.log(req.user.id)
      if (
        form.status === "In progress Lawyer" &&
        form.lawyerId.equals(req.user.id) 
      ) {
        if(form.fees === 0)
        {
          return res.status(400).json({ msg: "You can't accept this form :( You have to calculate the Fees first" });
        }
        form.status = "Lawyer accepted";
        const returnedForm = await dynamicFormController.update(
          "_id",
          formid,
          form
        );
        if (returnedForm.error)
          return res.status(400).json({ error: form.error });
        var investor = await userController.search("_id", form.investorId);
        if(investor!==null){
        if (investor.error)
          return res.status(400).json({ error: investor.error });
        var notifyUser = await notifications.notifyUserForFormUpdates(
          investor,
          returnedForm
        );
        return res.json({
          msg: "Form Accepted Successfully",
          data: returnedForm,
          notifications: notifyUser
        });
      }
      return res.json({msg: "Form Accepted Succesfully",
      data: returnedForm})
      } else {
        return res.status(400).json({ msg: "You can't accept this form :(" });
      }
    } else if (req.user.userType === "Reviewer") {
      const formid = req.params.formId;
      var form = await dynamicFormController.search("_id", formid);
      if (form.error) return res.status(400).json({ error: form.error });
      form=form[0].toJSON()
      console.log(form)
      if (
        form.status === "In progress Reviewer" &&
        form.reviewerId.equals(req.user.id)
      ) {
        form.status = "Reviewer accepted";
        const returnedForm = await dynamicFormController.update(
          "_id",
          formid,
          form
        );
        if (returnedForm.error)
          return res.status(400).json({ error: form.error });
        const investor = await userController.search('_id',returnedForm.investorId);
        if(investor!==null){
        if (investor.error)
          return res.status(400).json({ error: investor.error });
        const updatedFinancialBalance = form.fees + investor.financialBalance;
        const returnedInvestor = await userController.update(
          '_id',
          investor._id,
          { financialBalance: updatedFinancialBalance }
        );
        if (returnedInvestor.error)
          return res.status(400).json({ error: returnedInvestor.error });
        var notifyUser = await notifications.notifyUserForFormUpdates(
          investor,
          returnedForm
        );
        var notify = await notifications.notifyExternalEntities(returnedForm);
        return res.json({
          msg: "Form accepted succesfully",
          data: returnedForm,
          notifications: notifyUser
        });
      }
      return res.json({msg: "Form accepted Succesfully",
      data: returnedForm})
      } else {
        return res.status(400).json({ msg: "You can't accept this form :(" });
      }
    } else {
      return res.status(401).json({ msg: "Non Authorized" });
    }
  }
);

//Reviewer can reject form 
router.put(
  "/reject/:formId",
  passport.authenticate("jwt", { session: false }),
  async (req, res) => {
    if (req.user.userType === "Reviewer") {
      const formid = req.params.formId;
      var form = await dynamicFormController.search("_id", formid);
      if (form.error) return res.status(400).json({ error: form.error });
      form=form[0].toJSON()
      console.log(form)
      if (
        form.status === "In progress Reviewer" &&
        form.reviewerId.equals(req.user.id)
      ) {
        form.status = "Rejected";
        const returnedForm = await dynamicFormController.update(
          "_id",
          formid,
          form
        );
        if (returnedForm.error)
          return res.status(400).json({ error: form.error });
        const investor = await userController.search("_id".form.investorId);
        if(investor!==null){
        if (investor.error)
          return res.status(400).json({ error: investor.error });
        var notifyUser = await notifications.notifyUserForFormUpdates(
          investor,
          returnedForm
        );
        return res.json({
          msg: "Form rejected succesfully",
          data: returnedForm,
          notifications: notifyUser
        });
      }
      return res.json({msg: "Form rejected Succesfully",
      data: returnedForm})
      } else {
        return res.status(400).json({ msg: "You can't reject this form :(" });
      }
    } else {
      return res.status(401).json({ msg: "Non Authorized" });
    }
  }
)

//Lawyer or Reviewer take a case , giving him the ability to accept or reject it
router.put(
  "/takingForm/:formId",
  passport.authenticate("jwt", { session: false }),
  async (req, res) => {
    if (req.user.userType === "Lawyer") {
      const formid = req.params.formId;
      var form = await dynamicFormController.search("_id", formid);
      if (form.error) return res.status(400).json({ error: form.error });
      form = form[0].toJSON();
     // console.log(form)
     // console.log(req.user.id)
      if (form.status === "Unassigned" ) {  //|| form.status === "Reviewer rejected"
        form.status = "In progress Lawyer";
        form.lawyerId = req.user.id;
        const returnedForm = await dynamicFormController.update(
          "_id",
          formid,
          form
        );
       // console.log(returnedForm)
        if (returnedForm.error)
          return res.status(400).json({ error: returnedForm.error });
       // console.log(form.investorId);
        var investor = await userController.search("_id", form.investorId);
      // console.log(investor);
       if(investor!==null){
        if (investor.error)
          return res.status(400).json({ error: investor.error });
        var notifyUser = await notifications.notifyUserForFormUpdates(
          investor,
          returnedForm
        );
        return res.json({
          msg: "Form picked Succesfully",
          data: returnedForm,
          notification: notifyUser
        });
      }
      return res.json({msg: "Form picked Succesfully",
      data: returnedForm})
      } else {
        return res.status(400).json({ msg: "You can not take it :)" });
      }
    } else if (req.user.userType === "Reviewer") {
      const formid = req.params.formId;
      var form = await dynamicFormController.search("_id", formid);
      //console.log(form)
      if (form.error) return res.status(400).json({ error: form.error });
      form = form[0].toJSON();
      if (form.status === "Lawyer accepted") {
        console.log(form)
        form.status = "In progress Reviewer";
        form.reviewerId = req.user.id;
        
        const returnedForm = await dynamicFormController.update(
          "_id",
          formid,
          form
        );
       console.log(returnedForm)
        if (returnedForm.error)
          return res.status(400).json({ error: returnedForm.error });
        var investor = await userController.search("_id", form.investorId);
        if(investor!==null){
        if (investor.error)
          return res.status(400).json({ error: investor.error });
        var notifyUser = await notifications.notifyUserForFormUpdates(
          investor,
          returnedForm
        );
        return res.json({
          msg: "Form picked Succesfully",
          data: returnedForm,
          notification: notifyUser
        });
      }
      return res.json({
        msg: "Form picked Succesfully",
        data: returnedForm
      });
      } else {
        return res.status(400).json({ msg: "You can not take it :)" });
      }
    } else {
      return res.status(401).json({ msg: "Non Authorized" });
    }
  }
);



//Show an investors approved companies
router.get('/getInvestorApprovedCompanies', passport.authenticate('jwt', { session: false }), async (req, res) => {
	const userid = req.user.id;
	if (req.user.userType === 'Investor') {
		var forms = await dynamicFormController.search('investorId', userid);
		if (forms.error) return res.status(400).json({ error: forms.error });
		var acceptedForms = [];
		for (i = 0; i < forms.length; i++) {
			if (forms[i].status === 'Approved') acceptedForms.push(forms[i]);
		}
		res.json({ data: acceptedForms });
	} else {
		res.status(401).json({ msg: 'Non Authorized' });
	}
});
//Show an investors approved companies
router.get('/getAllApprovedCompanies', async (req, res) => {
		var forms = await dynamicFormController.search();
		if (forms.error) return res.status(400).json({ error: forms.error });
		var acceptedForms = [];
		for (i = 0; i < forms.length; i++) {
			if (forms[i].status === 'Approved') acceptedForms.push(forms[i]);
		}
		res.json({ data: acceptedForms });
});

//As a lawyer I can add a comment
router.put(
  "/lawyerComments/:formId",
  passport.authenticate("jwt", { session: false }),
  async (req, res) => {
    if (req.user.userType === "Lawyer") {
      const formid = req.params.formId;
      var form = await dynamicFormController.search("_id", formid);
      if (form.error) return res.status(400).json({ error: form.error });
      form = form[0].toJSON()
      var comments = form.lawyerComments;
      for (i = 0; i < req.body[Object.keys(req.body)].length; i++) {
        comments.push(req.body[Object.keys(req.body)][i]);
      }
      form.lawyerComments = comments;
      form.status = "Lawyer rejected";
      var updatedForm = await dynamicFormController.update("_id", formid, form);
      //console.log(updatedForm)
      var investor = await userController.search("_id", form.investorId);
      if(investor!==null){
      if (investor.error) return res.status(400).json({ error: investor.error });
      var notifyUser = await notifications.notifyUserForFormUpdates(
        investor,
        updatedForm
      );
      return res.json({ data: updatedForm, notifications: notifyUser });
    } 
     }else {
      return res.status(401).json({ msg: "Non Authorized" });
    }
  }
);

//As a Reviewer I can add a comment
router.put(
  "/reviewerComments/:formId",
  passport.authenticate("jwt", { session: false }),
  async (req, res) => {
    if (req.user.userType === "Reviewer") {
      const formid = req.params.formId;
      var form = await dynamicFormController.search("_id", formid);
      if (form.error) return res.status(400).json({ error: form.error });
      form = form[0].toJSON()
      var comments = form.reviewerComments;
      for (i = 0; i < req.body[Object.keys(req.body)].length; i++) {
        comments.push(req.body[Object.keys(req.body)][i]);
      }
      form.reviewerComments = comments;
      form.status = "Reviewer rejected";
      var updatedForm = await dynamicFormController.update("_id", formid, form);
      var investor = await userController.search("_id", form.investorId);
      if(investor!==null){
      if (investor.error)
        return res.status(400).json({ error: investor.error });
      var notifyUser = await notifications.notifyUserForFormUpdates(
       investor,
        updatedForm
      );
      return res.json({ data: updatedForm, notifications: notifyUser });
    } 
  }else {
      return res.status(401).json({ msg: "Non Authorized" });
    }
  }
);

//When the lawyer adds comments , the investor should edit the form and make the status of it "In progress lawyer"
router.put(
  "/investorEditForm/:formId",
  passport.authenticate("jwt", { session: false }),
  async (req, res) => {
    if (req.user.userType === "Investor") {
      const formid = req.params.formId;
      var form = await dynamicFormController.search("_id", formid);
      if (form.error) return res.status(400).json({ error: form.error });
      form = await form[0].toJSON()
      if(form.status==="Unassigned"){ 
        for(var prop in req.body){
         form[prop]=req.body[prop]
        }
        var updatedForm = await dynamicFormController.update("_id", formid, form);
        if(updatedForm.error) return res.status(400).json({error:updatedForm.error})
        return res.json({msg:"Form updated Successfully",data:updatedForm})
      }
      else if(form.status==="Lawyer rejected"){
        for(var prop in req.body){
          form[prop]=req.body[prop]
         }
         form.status="In progress Lawyer"
         var updatedForm = await dynamicFormController.update("_id", formid, form);
         if(updatedForm.error) return res.status(400).json({error:updatedForm.error})
         return res.json({msg:"Form updated Successfully",data:updatedForm})
      }
      else{
        return res.status(400).json({error:"You can't edit this form"})
      }
    } else {
      return res.status(401).json({ msg: "Non Authorized" });
    }
  }
);

// //Adding Attribute to Array
// router.put(
//   "/addAttributeToArray/",
//   passport.authenticate("jwt", { session: false }),
//   async (req, res) => {
//     if (req.user.userType === "Investor") {
//       console.log("lolo")
//      // const formid = req.params.formId;
//       var form = await dynamicFormController.search("companyName", req.body.companyName);
//       if (form.error) return res.status(400).json({ error: form.error });
//       console.log("lolo2")
//       form = await form[0].toJSON()    
//       if(form.status==="Unassigned"){
//         var arr = form[req.body.formTypeArray]
//         if(!arr)
//             form[req.body.formTypeArray]=[]
//         form[req.body.formTypeArray].push(req.body)
//        // console.log(form)    
//         var updatedForm = await dynamicFormController.update("_id", form._id, form);
//        // console.log(updatedForm)
//         if(updatedForm.error) return res.status(400).json({error:updatedForm.error})
//         return res.json({msg:"Form updated Successfully",data:updatedForm})
//       }
//       else{
//         return res.status(400).json({error:"You can't edit this form"})
//       }
//     } else  if (req.user.userType === "Lawyer") {
//       const formid = req.params.formId;
//       var form = await dynamicFormController.search("companyName", req.body.companyName);
//       if (form.error) return res.status(400).json({ error: form.error });
//       form = await form[0].toJSON()
//       if(form.status==="Lawyer accepted"){
//         var arr = form[req.body.formTypeArray]
//         if(!arr)
//             form[req.body.formTypeArray]=[]
//         form[req.body.formTypeArray].push(req.body)    
//         var updatedForm = await dynamicFormController.update("_id", formid, form);
//         if(updatedForm.error) return res.status(400).json({error:updatedForm.error})
//         return res.json({msg:"Form updated Successfully",data:updatedForm})
//       }
//       else{
//         return res.status(400).json({error:"You can't edit this form"})
//       } 
//     }else {
//       return res.status(401).json({ msg: "Non Authorized" });
//     }
//   }
// );
//Adding Attribute to Array
router.put(
  "/addAttributeToArray/",
  passport.authenticate("jwt", { session: false }),
  async (req, res) => {
    if (req.user.userType === "Investor") {
      console.log("lolo")
     // const formid = req.params.formId;
     console.log(req.body)
      console.log(req.body.companyName)
      console.log(req.body.formTypeArray)
      var form = await dynamicFormController.search("companyName", req.body.companyName);
      if (form.error) return res.status(400).json({ error: form.error });
      if(form===[] || form===null || form===undefined) return res.status(400).json({error:"Company doesn't exist"})
      console.log(form)
      form = await form[0].toJSON()
      if(form.status==="Unassigned"){
        if(!form[req.body.formTypeArray]){
          form[req.body.formTypeArray]=[]
          console.log("hi")
        }
        console.log(form[req.body.formTypeArray])
        var arr = form[req.body.formTypeArray]
        if(arr.length===0)
        //console.log(arr)
        form[req.body.formTypeArray].push(req.body)
       // console.log(form[req.body.formTypeArray])
        console.log(form)    
        var updatedForm = await dynamicFormController.update("_id", form._id, form);
        console.log(updatedForm)
        if(updatedForm.error) return res.status(400).json({error:updatedForm.error})
        return res.json({msg:"Form updated Successfully",data:updatedForm})
      }
      else{
        return res.status(400).json({error:"You can't edit this form"})
      }
    } else  if (req.user.userType === "Lawyer") {
      const formid = req.params.formId;
      var form = await dynamicFormController.search("companyName", req.body.companyName);
      if (form.error) return res.status(400).json({ error: form.error });
      form = await form[0].toJSON()
      if(form.status==="Lawyer accepted"){
        var arr = form[req.body.formTypeArray]
        if(!arr)
            form[req.body.formTypeArray]=[]
        form[req.body.formTypeArray].push(req.body)    
        var updatedForm = await dynamicFormController.update("_id", formid, form);
        if(updatedForm.error) return res.status(400).json({error:updatedForm.error})
        return res.json({msg:"Form updated Successfully",data:updatedForm})
      }
      else{
        return res.status(400).json({error:"You can't edit this form"})
      } 
    }else {
      return res.status(401).json({ msg: "Non Authorized" });
    }
  }
);


//lawyer can edit in the form after being rejected from the reviewer
router.put(
  "/lawyerEditForm/:formId",
  passport.authenticate("jwt", { session: false }),
  async (req, res) => {
    if (req.user.userType === "Lawyer") {
      const formid = req.params.formId;
      var form = await dynamicFormController.search("_id", formid);
      if (form.error) return res.status(400).json({ error: form.error });
      form = await form[0].toJSON()
      if( form.status==="Reviewer rejected"){
        for(var prop in req.body){
         form[prop]=req.body[prop]
        }
        form.status="In progress Reviewer"
        var updatedForm = await dynamicFormController.update("_id", formid, form);
        if(updatedForm.error) return res.status(400).json({error:updatedForm.error})
        return res.json({msg:"Form updated Successfully",data:updatedForm})
      }
      else{
        return res.status(400).json({error:"You can't edit this form"})
      }
    } else {
      return res.status(401).json({ msg: "Non Authorized" });
    }
  }
);

//investor can delete the form if it's status is unassigned
router.delete(
  "/investorDeleteForm/:formId",
  passport.authenticate("jwt", { session: false }),
  async (req, res) => {
    if (req.user.userType === "Investor") {
      const formid = req.params.formId;
      var form = await dynamicFormController.search("_id", formid);
      if (form.error) return res.status(400).json({ error: form.error });
      form = await form[0].toJSON()
      if(form.status==="Unassigned"){ 
        const deletedForm = await dynamicFormController.remove("_id",formid)
        res.json({ msg: "Form was deleted successfully", data: deletedForm });
      }
      else{
        return res.status(400).json({error:"You can't delete this form"})
      }
    } else {
      return res.status(401).json({ msg: "Non Authorized" });
    }
  }
);

module.exports = router;