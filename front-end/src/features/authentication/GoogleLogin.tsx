import { redirect, useNavigate } from "react-router-dom";
import { useAppDispatch } from "../../app/store/hooks";

const GoogleLoginButton = () => {
  const dispatch = useAppDispatch();

  const navigate = useNavigate();

  const handleGoogleLogin = async () => {
    window.open(
      `${import.meta.env.VITE_GOOGLEAPI_BASE_URL}/auth/google`,
      `_self`
    );
  };

  return (
    <button type="button" className="google-button" onClick={handleGoogleLogin}>
      <div className="google-icon-wrapper">
        <img
          className="google-icon"
          src="https://upload.wikimedia.org/wikipedia/commons/5/53/Google_%22G%22_Logo.svg"
        />
      </div>
      <span className="button-text">Sign in with Google</span>
    </button>
  );
};

export default GoogleLoginButton;
