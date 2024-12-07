import { createUserWithEmailAndPassword, Auth, UserCredential } from "firebase/auth"

const CreateAcc: ({ auth, email, password }: { auth: Auth, email: string, password: string })
    => Promise<UserCredential | { err: string }> = async ({ auth, email, password }: { auth: Auth, email: string, password: string }) => {
        try {
            const userData = await createUserWithEmailAndPassword(auth, email, password);
            return userData;
        } catch (err) {
            return { err: err instanceof Error ? err.message : 'Failed to create account. Please try again.' }
        }
    };
export default CreateAcc;