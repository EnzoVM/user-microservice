
export default interface UserPasswordGeneratorRepository {
    generateUserPassword: (userPassword: string) => Promise<string>
    decryptUserPassword: (passwordEntered: string, userPassword: string) => Promise<boolean>
}