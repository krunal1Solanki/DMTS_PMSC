import jwt from 'jsonwebtoken';
import { NextRequest } from 'next/server';

const getDataFromToken = (request: NextRequest) => {
    try {
        const token = request.cookies.get('token')?.value || '';
        const decoded: any = jwt.verify(token, 'PIKACHU');
        return decoded;
    } catch (error: any) {
        console.log(error.message)
    }
};


export default getDataFromToken
