import { useState } from 'react';
import { useNavigate } from 'react-router';
import { signupUser } from '../../services/authService';
import SignUpFormInput from './SignUpFormInput';

const SignupForm = () => {
  const [registerForm, setRegisterForm] = useState({
    firstName: '',
    lastName: '',
    address: '',
    specific: '', // For specific detail of the address
    district: '',
    subDistrict: '',
    city: '',
    postal: '',
    email: '',
    phoneNumber: '', // For mobile phone number
    userName: '',
    password: '',
    confirmPassword: '',
    smsPromotion: false,
    emailPromotion: false
  });

  const navigate = useNavigate();

  const handleOnchange = (e) => {
    const { name, value, type, checked } = e.target;
    setRegisterForm((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleRegisterSubmit = async (e) => {
    e.preventDefault();
    const submittingData = {
      firstName: registerForm.firstName,
      lastName: registerForm.lastName,
      addresses: {
        address: registerForm.address,
        specific: registerForm.password,
        district: registerForm.password,
        subDistrict: registerForm.password,
        city: registerForm.password,
        postal: registerForm.password
      },
      email: registerForm.email,
      phoneNumber: registerForm.phoneNumber, // For mobile phone number
      userName: registerForm.userName,
      password: registerForm.password,
      confirmPassword: registerForm.confirmPassword,
      smsPromotion: registerForm.smsPromotion,
      emailPromotion: registerForm.smsPromotion
    };
    console.log('Submitting the form with these details:', submittingData);
    await signupUser(submittingData);
    alert('Register successful');
    navigate('/login');
  };

  return (
    <>
      <section id="signup" className="flex items-center justify-center min-h-screen">
        <div className="w-full max-w-4xl p-6 placeholder-gray-300 bg-white">
          <h2 className="mb-10 text-5xl font-bold text-center">Sign Up</h2>
          <h3 className="text-3xl font-semibold">User Information</h3>
          <form className="mt-6" onSubmit={handleRegisterSubmit}>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <SignUpFormInput name="email" label="Email" type="email" onChange={handleOnchange} required />
              </div>
              <div>
                <SignUpFormInput name="phoneNumber" label="Mobile phone number" type="tel"  onChange={handleOnchange} maxLength="10" required />
              </div>
            </div>
            <div className="mt-4">
              <SignUpFormInput name="userName" label="Username" onChange={handleOnchange} required />
            </div>
            <div className="mt-4">
              <SignUpFormInput name="password" label="Password" type="password" onChange={handleOnchange} required />
            </div>
            <div className="mt-4">
              <SignUpFormInput name="confirmPassword" label="Confirm Password" type="password" onChange={handleOnchange} required />
            </div>
            <div className="grid grid-cols-2 gap-4 mt-4">
              <div>
                <SignUpFormInput name="firstName" label="First name" onChange={handleOnchange} required />
              </div>
              <div>
                <SignUpFormInput name="lastName" label="Last name" onChange={handleOnchange} required />
              </div>
            </div>
            <div className="mt-4">
              <SignUpFormInput
                name="address"
                label="Shipping address detail"
                placeholder="Name of the adddress, building, apt"
                onChange={handleOnchange}
                required
              />
            </div>
            <div className="mt-4">
              <SignUpFormInput
                name="specific"
                label="Specific detail of the address"
                placeholder="Specify company, apt, suite, unit"
                onChange={handleOnchange}
                required
              />
            </div>
            <div className="grid grid-cols-2 gap-4 mt-4">
              <div>
                <SignUpFormInput name="district" label="District" onChange={handleOnchange} required />
              </div>
              <div>
                <SignUpFormInput name="subDistrict" label="Subdistrict" onChange={handleOnchange} required />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4 mt-4">
              <div>
                <SignUpFormInput name="postal" label="Postal code" maxLength="5" onChange={handleOnchange} required />
              </div>
              <div>
                <SignUpFormInput name="city" label="City" onChange={handleOnchange} required />
              </div>
            </div>
            <div className="mt-5 space-y-3">
              <label className="flex items-center gap-2 text-lg">
                <input
                  type="checkbox"
                  name="smsPromotion"
                  checked={registerForm.smsPromotion}
                  onChange={handleOnchange}
                  className="w-6 h-6 form-checkbox"
                />
                Please send me SMS shipping updates about my order
              </label>
              <label className="flex items-center gap-2 text-lg">
                <input
                  type="checkbox"
                  name="emailPromotion"
                  checked={registerForm.emailPromotion}
                  onChange={handleOnchange}
                  className="w-6 h-6 form-checkbox"
                />
                Please add me to the Custommike? email list
              </label>
            </div>
            <div className="flex justify-center mt-10">
              <button
                type="submit"
                className="text-2xl placeholder-gray-300 bg-[#334DD8] text-white py-2 px-3 w-[456px] h-[56px] rounded-full hover:bg-blue-700"
              >
                Sign Up
              </button>
            </div>

            <p className="mt-10 mb-8 text-center text-gray-400">
              By signing up I agree to the
              <a href="#" className="underline">
                terms and conditions
              </a>{' '}
              and
              <a href="#" className="underline">
                privacy policy
              </a>
              .
            </p>
          </form>
        </div>
      </section>
    </>
  );
};
export default SignupForm;
