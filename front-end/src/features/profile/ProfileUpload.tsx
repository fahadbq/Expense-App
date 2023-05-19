import { useFormikContext } from "formik";
import { useState } from "react";
import { useAppSelector } from "../../app/store/hooks";
import usersolid from "../../assets/images/user-solid.svg";

const ImgUpload = ({ onChange, src }: any) => (
  <div className="custom-file-upload img-wrap img-upload">
    <img width={100} alt="photo-upload" src={src} className="image-input" />
    <label className="photo-upload">
      <input id="photo-upload" type="file" onChange={onChange} />
    </label>
  </div>
);

const ProfileUpload = () => {
  const { setFieldValue } = useFormikContext();

  const { userData } = useAppSelector((state) => state.authentication);

  const baseURL = import.meta.env.VITE_API_BASE_URL;
  const imagePath = userData.profile?.picture?.replace("\\", "/");

  const imageUrl = `${baseURL}/${imagePath}`;

  const [imagePreviewUrl, setImagePreviewUrl] = useState<
    string | ArrayBuffer | null
  >(
    imageUrl ||
      "https://github.com/OlgaKoplik/CodePen/blob/master/profile.jpg?raw=true"
  );
  //   const [active, setActive] = useState("edit");

  console.log(
    "userData.profile?.picture",
    userData.profile?.picture?.replace("\\", "/")
  );

  const getBase64 = (fileReader: any): Promise<string> =>
    new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(fileReader);
      reader.onload = () => {
        resolve(reader.result as string);
      };
      reader.onerror = (error) => reject(error);
    });

  const photoUpload = async (e: any) => {
    e.preventDefault();

    const file = e.target.files[0];
    console.log("file", file);
    const reader = await getBase64(file);
    setImagePreviewUrl(reader);
    setFieldValue("picture", file);
  };

  return (
    <>
      <ImgUpload onChange={photoUpload} src={imagePreviewUrl} />
    </>
  );
};

export default ProfileUpload;
