import {  makeAutoObservable } from 'mobx';

export default class CommonStore {
  public userProfile?: any = undefined;
  public isEditing?: boolean = false;
  public searchContent?: string = undefined;
  public constructor() {
    makeAutoObservable(this);
  }

  public setUserProfile = (userProfile?: any) => {
    this.userProfile = userProfile;
  };

  public setIsEditing = (boolean: boolean) => {
    this.isEditing = boolean;
  };

  public setSearchContent = (content: string) => {
    console.log("searchContent")
    this.searchContent = content;
  };
}
