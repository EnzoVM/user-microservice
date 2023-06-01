
export default interface UserIdGeneratorRepository {
    generateUserId: () => bigint
}