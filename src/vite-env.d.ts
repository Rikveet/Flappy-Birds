import store from "@/store";


declare global {
    // redux store types for react-redux
    type RootState = ReturnType<typeof store.getState>
    type AppDispatch = typeof store.dispatch

    module "*.module.css";
    module "*.css";
    module "*.module.scss";
    module "*.module.sass";

    module "*.png";
    module "*.jpg";
    module "*.jpeg";
    module "*.svg";
    module "*.webp";

    module "*.lottie";

}