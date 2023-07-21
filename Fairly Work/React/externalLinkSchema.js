import * as Yup from "yup";

const linkSchema = Yup.object().shape({
  urlTypeId: Yup.number().required("Please Select a Type of Platform"),
  entityId: Yup.number(),
  entityTypeId: Yup.number().required("Please Select a Type of Link"),
  url: Yup.string().max(255).required("Please Enter a Url"),
});

export default linkSchema;
