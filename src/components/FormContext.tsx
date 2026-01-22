import {
  createContext,
  useState,
  ReactNode,
  Dispatch,
  SetStateAction,
} from "react";

//データの形を定義
interface FormData {
  name: string;
  email: string;
  message: string;
  birthday: string;
  menu: string;
}
//context で共有する値全体の形を定義
interface FormContextType {
  formData: FormData;
  setFormData: Dispatch<SetStateAction<FormData>>;
}
//createContextに型を教える（初期値はundefined）
export const FormContext = createContext<FormContextType | undefined>(
  undefined
);

// Contextを提供するProviderコンポーネント
export const FormProvider = ({ children }: { children: ReactNode }) => {
  const [formData, setFormData] = useState<FormData>({
    name: "",
    email: "",
    message: "",
    birthday: "",
    menu: "",
    // 必要なフォームの初期値
  });

  return (
    // Contextオブジェクトの .Provider を使って値を提供する
    <FormContext.Provider value={{ formData, setFormData }}>
      {children}
    </FormContext.Provider>
  );
};
