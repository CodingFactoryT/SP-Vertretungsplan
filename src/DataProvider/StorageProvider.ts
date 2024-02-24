import React from 'react';
import useAsyncStorage from '../hooks/useAsyncStorage';
import useSecureStorage from '../hooks/useSecureStorage';

export default function StorageProvider() {
    
  const { getData: _getSchoolID, storeData: _storeSchoolID } =
    useSecureStorage("SchoolIDSECURE");
  const { getData: _getUsername, storeData: _storeUsername } =
    useSecureStorage("LoginNameSECURE");
  const { getData: _getPassword, storeData: _storePassword } =
    useSecureStorage("LoginPasswordSECURE");


  const { getData: _getSchoolIDDEPRECATED, storeData: _storeSchoolIDDEPRECATED } =
    useAsyncStorage("SchoolID");
  const { getData: _getUsernameDEPRECATED, storeData: _storeUsernameDEPRECATED } =
    useAsyncStorage("LoginName");
  const { getData: _getPasswordDEPRECATED, storeData: _storePasswordDEPRECATED } =
    useAsyncStorage("LoginPassword");  


  const { getData: _getTheme, storeData: _storeTheme } = useAsyncStorage("Theme");
  const {
    getData: _getSubstitutionPlanPersonalized,
    storeData: _storeSubstitutionPlanPersonalized,
  } = useAsyncStorage("PersonalizedSubstitutionPlan");

  function storeLoginData(schoolID: string, username: string, password: string) {
    _storeSchoolID(schoolID);
    _storeUsername(username);
    _storePassword(password);
  }

  function storeLoginDataDEPRECATED(schoolID: string, username: string, password: string) {
    _storeSchoolIDDEPRECATED(schoolID);
    _storeUsernameDEPRECATED(username);
    _storePasswordDEPRECATED(password);
  }

  function getLoginData() {
    return Promise.all([_getSchoolID(),_getUsername(),_getPassword()]);
  }

  function getLoginDataDEPRECATED() {
    return Promise.all([_getSchoolIDDEPRECATED(),_getUsernameDEPRECATED(),_getPasswordDEPRECATED()]);
  }

  type Theme = "light" | "dark";
  function storeTheme(theme: Theme) {
    _storeTheme(theme);
  }

  function getTheme() {
    return _getTheme();
  }

  function storeSubstitutionPlanPersonalized(isSubstitutionPlanPersonalized: boolean) {
    _storeSubstitutionPlanPersonalized(isSubstitutionPlanPersonalized.toString());
  }

  function getSubstitutionPlanPersonalized() {
    return _getSubstitutionPlanPersonalized();
  }

  return {
    storeLoginData,
    storeLoginDataDEPRECATED,
    getStoredLoginDataDEPRECATED: getLoginDataDEPRECATED,
    getStoredLoginData: getLoginData,
    storeTheme,
    getStoredTheme: getTheme,
    storeSubstitutionPlanPersonalized,
    getStoredSubstitutionPlanPersonalized: getSubstitutionPlanPersonalized
  }

}