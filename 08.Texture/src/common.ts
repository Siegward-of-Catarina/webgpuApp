export const NullCheck = (obj: any) => {
  if (obj === null) {
    throw Error(obj + "is null");
  }
  else {
    //console.log("success");
  }
}