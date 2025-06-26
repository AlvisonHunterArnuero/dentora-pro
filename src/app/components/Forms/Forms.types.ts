export type SignInFormValues = {
    email: string;
    password: string;
};

export type SignUpFormValues = {
    firstName: string;
    lastName: string;
    address: string;
    phone: string;
    email: string;
    password: string;
    confirmPassword: string;
};

export interface SignInFormProps {
    onSubmit: (values: SignInFormValues) => void;
    isSubmitting: boolean;
}

export interface SignUpFormProps {
    onSubmit: (values: SignUpFormValues) => void;
    isSubmitting:boolean;
}