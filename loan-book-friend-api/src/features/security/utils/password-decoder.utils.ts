import * as bcrypt from 'bcrypt';

export const encryptPassword = async (password: string): Promise<string> =>
    await bcrypt.hash(password, 10);

export const comparePassword = async (
    password: string,
    hash: string,
): Promise<boolean> => await bcrypt.compare(password, hash);
