import React from 'react';
import useAsyncStorage from '../hooks/useAsyncStorage';

export default function StorageProvider() {
    
  const { getData: _getSchoolID, storeData: _storeSchoolID } =
    useAsyncStorage("SchoolID");
  const { getData: _getUsername, storeData: _storeUsername } =
    useAsyncStorage("LoginName");
  const { getData: _getPassword, storeData: _storePassword } =
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

  function getLoginData() {
    return Promise.all([_getSchoolID(),_getUsername(),_getPassword()]);
  }

  type Theme = "light" | "dark";
  function storeTheme(theme: Theme) {
    _storeTheme(theme);
  }

  function getTheme() {
    return _getTheme();
  }

  function storeSubstitutionPlanPersonalized(isSubstitutionPlanPersonalized: boolean) {
    console.log(isSubstitutionPlanPersonalized);
    _storeSubstitutionPlanPersonalized(isSubstitutionPlanPersonalized.toString());
  }

  function getSubstitutionPlanPersonalized() {
    return _getSubstitutionPlanPersonalized();
  }

  return {
    storeLoginData,
    getStoredLoginData: getLoginData,
    storeTheme,
    getStoredTheme: getTheme,
    storeSubstitutionPlanPersonalized,
    getStoredSubstitutionPlanPersonalized: getSubstitutionPlanPersonalized
  }

}