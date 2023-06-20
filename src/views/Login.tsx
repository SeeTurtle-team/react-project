import React from 'react';
import { InputText } from 'primereact/inputtext';

const Login = () => {
    return (
        <div className='card'>
            <div className="flex flex-wrap gap-3 mb-4">
                <div className="flex-auto">
                    <label htmlFor="integer" className="font-bold block mb-2">
                        아이디
                    </label>
                    <InputText id="integer" keyfilter="int" className="w-full" />
                </div>
                <div className="flex-auto">
                    <label htmlFor="number" className="font-bold block mb-2">
                        비번
                    </label>
                    <InputText id="number" keyfilter="num" className="w-full" />
                </div>
                <div className="flex-auto">
                    <label htmlFor="money" className="font-bold block mb-2">
                        이름
                    </label>
                    <InputText id="money" keyfilter="money" className="w-full" />
                </div>
            </div>
            <div className="flex flex-wrap gap-3">
                <div className="flex-auto">
                    <label htmlFor="hex" className="font-bold block mb-2">
                        생년월일
                    </label>
                    <InputText id="hex" keyfilter="hex" className="w-full" />
                </div>
                <div className="flex-auto">
                    <label htmlFor="alphabetic" className="font-bold block mb-2">
                        닉네임
                    </label>
                    <InputText id="alphabetic" keyfilter="alpha" className="w-full" />
                </div>
                <div className="flex-auto">
                    <label htmlFor="alphanumeric" className="font-bold block mb-2">
                        이메일
                    </label>
                    <InputText id="alphanumeric" keyfilter="alphanum" className="w-full" />
                </div>
            </div>
            <div className="flex flex-wrap gap-2">
                <div className="flex-auto">
                    <label htmlFor="hex" className="font-bold block mb-2">
                        이미지
                    </label>
                    <InputText id="hex" keyfilter="hex" className="w-full" />
                </div>
                <div className="flex-auto">
                    <label htmlFor="alphabetic" className="font-bold block mb-2">
                        직업
                    </label>
                    <InputText id="alphabetic" keyfilter="alpha" className="w-full" />
                </div>
            </div>
        </div>
    );
};

export default Login;