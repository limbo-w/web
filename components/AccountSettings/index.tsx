import * as React from "react";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import { Button, Divider, Input, MenuItem, Select } from "@mui/material";
import Image from "next/image";
import styles from "./index.module.css";
import classnames from "classnames";
import countryData from "./country.json";
import stores from "../../stores";
import { updateUserProfile, uploadImg ,sendEmailBound ,boundEmail} from "../../server/api/user";
import {getUserProfile} from "../../server/api/user"
import message from "../Message";
export default function AccountInfo() {
  const { commonStore } = stores;
  const [userInfo, setUserInfo] = React.useState<any>({
    avatar: commonStore.userProfile?.avatar,
    name: commonStore.userProfile?.nickname,
    Email: commonStore.userProfile?.email,
    country: commonStore.userProfile?.country,
    phone: commonStore.userProfile?.phone,
    gender: commonStore.userProfile?.gender,
    age: commonStore.userProfile?.age,
  });
  const [userInfoEdit, setUserInfoEdit] = React.useState({
    avatar: commonStore.userProfile?.avatar,
    name: commonStore.userProfile?.nickname,
    country: commonStore.userProfile?.country,
    phone: commonStore.userProfile?.phone,
    gender: commonStore.userProfile?.gender,
    age: commonStore.userProfile?.age,
  });
  React.useEffect(()=>{
    getUserProfile().then((res) => {
      if (res.username || res.nickname) {
        setUserInfo(res)
        console.log(commonStore,"commonStore")
        return
      }
    });
    console.log(userInfo,"userInfo")
  },[])
  const [isEditing, setIsEditing] = React.useState(commonStore.isEditing);
  React.useEffect(() => {
    setIsEditing(commonStore.isEditing);
  }, [commonStore.isEditing]);
  const [emailAddress, setEmailAddress] = React.useState("");
  const [avatar,setAvatar] = React.useState("")
  const _uploadImg = (e) => {
    const formData = new FormData();
    formData.append("image", e.target?.files[0]);
    setAvatar(URL.createObjectURL(e.target?.files[0]))
    // console.log(e.target?.files[0])
    // formdat
    uploadImg(formData);
  };
  const handleSave = async () => {
    const { nickname } = await updateUserProfile({
      nickname: userInfoEdit.name,
    });
    if (nickname) {
      const update = Object.assign(userInfo, {
        username: userInfoEdit.name,
        country: userInfoEdit.country,
      });
      setUserInfo(update);
      // commonStore.setUserProfile({name:nickname});
      commonStore.setIsEditing(false);
      message.success({ content: "save successfully" });
    } else {
      message.error({ content: "save error" });
    }
  };
  const [isEditEmail, setIsEditingEmail] = React.useState(false);
  const [emailCode,setEmailCode] = React.useState('')
  // function boundEmail(emailCode: string) {
  //   throw new Error("Function not implemented.");
  // }
  return (
    <>
      <CardContent>
        <Typography
          sx={{ display: "flex", justifyContent: "space-between" }}
          variant="h6"
          component="div"
        >
          <p>Account Settings</p>
          <p
            className={classnames(
              styles.edit,
              isEditing && styles.hidden,
              "cursor-pointer"
            )}
            onClick={() => setIsEditing(true)}
          >
            <span>Edit</span>{" "}
            <Image src="/change.png" alt="change" width={20} height={20} />{" "}
          </p>
        </Typography>
      </CardContent>
      <Divider />
      <CardContent className={styles.personal} style={{ paddingBottom: 0 }}>
        <Typography sx={{ padding: "15px 0" }} variant="h6" component="div">
          <p>Personal Information</p>
        </Typography>
        <div className="mt-2 mb-2">
          <p className={styles.label}>User Avatar</p>
          <div className={styles.firstRight}>
            {isEditing && (
              <Button component="label">
                Upload
                <input
                  onChange={_uploadImg}
                  hidden
                  accept="image/*"
                  type="file"
                />
              </Button>
            )}
            {
              !avatar?.length ? <Image
              src={
                userInfo.avatar
                  ? `${process.env.NEXT_PUBLIC_API_HOST}/medias/images/${userInfo.avatar.id}${userInfo.avatar.ext}`
                  : "/user_def.png"
              }
              alt="change"
              width={42}
              height={42}
            /> : <Image
            src={avatar}
            alt="change"
            width={42}
            height={42}
          />
            }
            
          </div>
        </div>
        <div className={styles.userInfo}>
          <p className={styles.label}>Name</p>
          <p className={classnames(styles.value, isEditing && styles.hidden)}>
            {userInfo.nickname ? (
              userInfo.nickname
            ) : (
              <div className="space-x-2">
                <span>Unsettled</span>
                <span
                  className="text-blue-500 cursor-pointer hover:text-blue-800 first-letter: "
                  onClick={() => setIsEditing(true)}
                >
                  Set it up now
                </span>
              </div>
            )}
          </p>
          <div
            className={classnames(
              styles.inputField,
              !isEditing && styles.hidden
            )}
          >
            <Input
              defaultValue={userInfo.username}
              onChange={(e) => {
                const obj = Object.assign(userInfoEdit, {
                  name: e.target.value,
                });
                setUserInfoEdit(obj);
              }}
            />
          </div>
        </div>
        <div className={styles.userInfo}>
          <p className={styles.label}>Email</p>
          {isEditEmail && (
            <div className="mb-10 space-y-4">
              <div className="space-x-2">
                <Input
                  defaultValue={emailAddress}
                  onChange={(e) => {
                    setEmailAddress(e.target.value);
                  }}
                />
                <Button
                  onClick={async () => {
                    try {
                      const res = await sendEmailBound(emailAddress);
                      console.log(res, "error");
                    } catch (error) {
                      message.error({
                        content: "you mail may be bound by others",
                      });
                    }
                    // if(error){
                    //   message.error({content:message})
                    // }else{
                    //   message.success({content:'already send'})
                    // }
                  }}
                >
                  Send code
                </Button>
              </div>
              <div className="space-x-2">
                <Input
                  defaultValue={emailCode}
                  onChange={(e) => {
                    setEmailCode(e.target.value);
                  }}
                />
                <Button
                  onClick={() => {
                    boundEmail(emailAddress, emailCode);
                  }}
                >
                  Confirm
                </Button>
              </div>
            </div>
          )}
          {!isEditEmail && (
            <p className={styles.value}>
              {userInfo?.email ?? (
                <div>
                  <span>Not yet bound to Email.</span>
                  <Button
                    onClick={() => {
                      setIsEditingEmail(true);
                    }}
                  >
                    Bind Email
                  </Button>
                </div>
              )}
            </p>
          )}
        </div>
        {/* <div className={styles.userInfo}>
          <p className={styles.label}>Country/Region</p>
          <p className={classnames(styles.value, isEditing && styles.hidden)}>{userInfo.country
            ? userInfo.country :
            <div className="space-x-2">
              <span>Unsettled</span>
              <span className="text-blue-500 cursor-pointer hover:text-blue-800 first-letter: " onClick={() => setIsEditing(true)}>Set it up now</span>
            </div>
          }</p>
          <Select className={classnames(!isEditing && styles.hidden)} defaultValue={userInfo.country}
          onChange={(e)=>{
            const obj = userInfoEdit
            obj.country = e.target.value
            setUserInfoEdit(obj)
          }}
          >
            {countryData.countryData.map((item, index) => (
              <MenuItem
                key={index}
                value={item.content}
              >
                {item.content}
              </MenuItem>
            ))}
          </Select>
        </div> */}
        <div className={classnames(styles.btns, !isEditing && styles.hidden)}>
          <Button
            onClick={() => setIsEditing(false)}
            color="inherit"
            variant="contained"
          >
            Cancel
          </Button>
          <Button
            onClick={handleSave}
            variant="contained"
            className="bg-blue-500"
          >
            Save
          </Button>
        </div>
      </CardContent>
    </>
  );
}
