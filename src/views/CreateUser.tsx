import React from 'react';
import { InputText } from 'primereact/inputtext';

const CreateUser = () => {
    return (
        <div className='card'>
            <div className="flex flex-wrap gap-3 mb-4">
                <div className="flex-auto">
                    <label htmlFor="integer" className="font-bold block mb-2">
                        아이디
                    </label>
                    <InputText id="userid" keyfilter="alphanum" className="w-full" />
                </div>
                <div className="flex-auto">
                    <label htmlFor="number" className="font-bold block mb-2">
                        비번
                    </label>
                    <InputText id="password" keyfilter="alphanum" className="w-full" />
                </div>
                <div className="flex-auto">
                    <label htmlFor="integer" className="font-bold block mb-2">
                        이름
                    </label>
                    <InputText id="name" keyfilter="alpha" className="w-full" />
                </div>
            </div>
            <div className="flex flex-wrap gap-3">
                <div className="flex-auto">
                    <label htmlFor="hex" className="font-bold block mb-2">
                        생년월일
                    </label>
                    <InputText id="birth" keyfilter="num" className="w-full" />
                </div>
                <div className="flex-auto">
                    <label htmlFor="integer" className="font-bold block mb-2">
                        닉네임
                    </label>
                    <InputText id="nickname" keyfilter="alphanum" className="w-full" />
                </div>
                <div className="flex-auto">
                    <label htmlFor="integer" className="font-bold block mb-2">
                        이메일
                    </label>
                    <InputText id="email" keyfilter="alphanum" className="w-full" />
                </div>
            </div>
            <div className="flex flex-wrap gap-2">
                <div className="flex-auto">
                    <label htmlFor="hex" className="font-bold block mb-2">
                        이미지
                    </label>
                    <InputText id="img" keyfilter="hex" className="w-full" />
                </div>
                <div className="flex-auto">
                    <label htmlFor="integer" className="font-bold block mb-2">
                        직업
                    </label>
                    <InputText id="job" keyfilter="alpha" className="w-full" />
                </div>
            </div>
        </div>
    );
};

export default CreateUser;