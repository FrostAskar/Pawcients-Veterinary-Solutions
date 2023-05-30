package com.esliceu.pawcients.Forms;

public class VerifyEmailForm {
        String code;

        public VerifyEmailForm() {
        }

        public VerifyEmailForm( String code) {

            this.code = code;
        }

        public String getCode() {
            return code;
        }
}
