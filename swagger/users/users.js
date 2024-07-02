/**
 * @swagger
 * tags:
 *   name: Users
 *   description: User management
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     UsersRegisterBody:
 *       type: object
 *       required:
 *         - name
 *         - age
 *         - gender  
 *         - mobile
 *         - countrycode
 *         - accountholdername
 *         - accountnumber
 *         - ifsccode
 *         - bankname
 *         - branchname
 *         - accounttype
 *       properties:
 *         name:
 *           type: string
 *           example: User Name
 *         age:
 *           type: string
 *           example: Age
 *         gender:
 *           type: string
 *           example: Gender
 *         countrycode:
 *           type: string
 *           example: "+91"
 *         mobile:
 *           type: number
 *           example: 9876543210
 *         Address:
 *            type: object
 *            properties:
 *              city:
 *                type: string
 *                example : Chennai
 *              pincode:
 *                type: number
 *                example : 605801
 *              state: 
 *                type: string
 *                example : Tamil Nadu
 *         instaId:
 *           type: string
 *           example: Insta Id
 *         facebookId:
 *           type: string
 *           example: Facebook Id
 *         AtsSocialMedia:
 *           type: string
 *           example: 120 min
 *         profession:
 *           type: string
 *           example: Developer
 *         Bank:
 *            type: object
 *            properties:
 *              accountholdername:
 *                type: string
 *                example : Sample
 *              accountnumber:
 *                type: string
 *                example : 987654321234567890
 *              ifsccode: 
 *                type: string
 *                example : IOBA8765435
 *              bankname:
 *                type: string
 *                example : Sample Bank
 *              branchname:
 *                type: string
 *                example : Sample Branch
 *              accounttype: 
 *                type: string
 *                example : Savings
 *              swiftcode: 
 *                type: string
 *                example : swiftcode
 *     UsersResponse:
 *       type: object
 *       properties:
 *         message:
 *           type: string
 *           example: Data Saved Success
 */

/**
 * @swagger
 * /api/users/register:
 *   post:
 *     summary: Register
 *     tags: [Users]
 *     requestBody:
 *      required: true
 *      content:
 *         application/json:
 *            schema:
 *              $ref: '#/components/schemas/UsersRegisterBody'
 *     responses:
 *       200:
 *         description: Data Saved Success
 */
