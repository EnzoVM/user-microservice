import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { verifyUserRole } from '../../../src/middlewares/verify.user.role';

describe('Verify role middleware', () => {

    test('Should return 401 if no token is found', () => {
        const req: Partial<Request> = {
            header: jest.fn().mockReturnValue(null)
        }

        const res: Partial<Response> = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn()
        }

        const next = jest.fn()

        verifyUserRole('Owner')(req as Request, res as Response, next as NextFunction)

        expect(res.status).toHaveBeenCalledWith(401)
        expect(res.json).toHaveBeenCalledWith({
            message: 'Unauthorized access. A valid token is required'
        })
        expect(next).not.toHaveBeenCalled()
    })
    

    test('Should return 403 if userRole does not match', () => {
        const req: Partial<Request> = {
            header: jest.fn().mockReturnValue('eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQ')
        }

        const res: Partial<Response> = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn()
        }

        const next = jest.fn()

        jwt.verify = jest.fn().mockReturnValue({
            userId: '883747473473743',
            userRole: 'Administrator'
        })
        
        verifyUserRole('Owner')(req as Request, res as Response, next as NextFunction)

        expect(res.status).toHaveBeenCalledWith(403)
        expect(res.json).toHaveBeenCalledWith({
            message: 'Access denied. Owner role is required'
        })
        expect(next).not.toHaveBeenCalled()
    })


    test('Should call next if userRole matches', () => {
        const req: Partial<Request> = {
            header: jest.fn().mockReturnValue('eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9'),
        }

        const res: Partial<Response> = {
            status: jest.fn(),
            json: jest.fn()
        }

        const next = jest.fn()
    
        jwt.verify = jest.fn().mockReturnValue({
            userId: '883747473473743',
            userRole: 'Owner'
        })
    
        verifyUserRole('Owner')(req as Request, res as Response, next as NextFunction)
    
        expect(res.status).not.toHaveBeenCalled()
        expect(res.json).not.toHaveBeenCalled()
        expect(next).toHaveBeenCalled()
    })


    test('Should return 401 if token is invalid', () => {
        const req: Partial<Request> = {
            header: jest.fn().mockReturnValue('Bearer invalidToken: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9')
        }

        const res: Partial <Response> = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn()
        }
        
        const next = jest.fn()
    
        jwt.verify = jest.fn().mockImplementation(() => {
            throw new Error('Invalid token')
        })
    
        verifyUserRole('Owner')(req as Request, res as Response, next as NextFunction)
    
        expect(res.status).toHaveBeenCalledWith(401)
        expect(res.json).toHaveBeenCalledWith({
            message: 'Invalid token'
        })
        expect(next).not.toHaveBeenCalled()
    })
})
  
