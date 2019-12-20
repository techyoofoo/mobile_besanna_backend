import Companies from "../models/company-model";

export const CreateCompany = async (request, h) => {
  try {
    const chkCompanyExists = await Companies.find({
      name: request.payload.name
    });
    if (chkCompanyExists.length > 0) {
      return h.response({
        Message: request.payload.name + " company already exists",
        status: 200
      });
    }
    const requestPayload = new Companies(request.payload);
    const saveCompanyData = await requestPayload.save();

    return h.response({
      saveCompanyData,
      message: saveCompanyData.name + " saved successfully"
    });
  } catch (error) {
    return h.response(error).code(500);
  }
};

//Get all list of users
export const GetAllCompanies = async (req, res) => {
  try {
    const lstOfCompanies = Companies.find({}).select(
      "-_id -createdAt -updatedAt -__v"
    );
    let fetchCompanyData = await lstOfCompanies;
    let len = 0;
    console.log("-----users length-----", fetchCompanyData.length);
    if (fetchCompanyData.length > 0) {
      len = fetchCompanyData.length;
      return res.response({ data: fetchCompanyData, message: "Success" });
    } else {
      len = fetchCompanyData.length;
      return res.response({ data: fetchCompanyData, message: "No data found" });
    }

    return len;
  } catch (error) {
    return res.response(error).code(500);
  }
};

//Get Company data based on name
export const GetCompanyDataByName = async (req, h) => {
  try {
    const fetchCompanyDataByName = await Companies.find({
      name: req.params.Company_name
    }).select("-_id -createdAt -updatedAt -__v");
    if (fetchCompanyDataByName.length > 0) {
      return h.response({ data: fetchCompanyDataByName, message: "success" });
    } else {
      return h.response({
        data: fetchCompanyDataByName,
        message: "no data found"
      });
    }
    return h.response({ data: fetchCompanyDataByName, message: "success" });
  } catch (error) {
    return h.response(error).code(500);
  }
};

//Inactiveate Company name from collection
export const InActivateCompanyName = async (req, h) => {
  try {
    const getActivatedCompanyData = await Companies.find({
      name: req.params.Company_name,
      status: "Active"
    }).select("-_id -createdAt -updatedAt -__v");
    if (getActivatedCompanyData.length > 0) {
      const filterVal = { name: req.params.Company_name };
      const updateVal = { status: "In-Active" };
      const updateStatus = await Companies.findOneAndUpdate(
        filterVal,
        updateVal,
        { new: true }
      );
      return h.response({
        data: updateStatus,
        message: updateStatus.name + " is In-Activated"
      });
    } else {
      return h.response({
        data: getActivatedCompanyData,
        message: "no data found"
      });
    }
    return h.response({ data: getActivatedCompanyData });
  } catch (error) {
    return h.response(error).code(500);
  }
};
