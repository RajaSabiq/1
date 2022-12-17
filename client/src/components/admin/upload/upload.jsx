import './upload.css'
import { useState } from 'react'
import { Notifications } from '../../../helper/notifications'
import Api from '../../../api/api'
import { useHistory } from 'react-router-dom'

const Upload = ({ uid }) => {
    const history = useHistory()
    const [showFiles, setShowFiles] = useState({ images: true, video: true })
    const [formData, setFormData] = useState({
        uid: '',
        asset: '',
        title: '',
        thumbnail: '',
        categoryName: 'music',
        region: '',
        description: '',
        filetype: 'video',
        talentImg: []
    });

    const setInputHandle = (e) => {
        if (e.target.name === 'talentImg') {
            setShowFiles({ images: true, video: false })
            setFormData((prev) => ({ ...prev, asset: '', [e.target.name]: e.target.files }));

        } else if (e.target.name === "asset") {
            setShowFiles({ images: false, video: true })
            setFormData((prev) => ({ ...prev, talentImg: [], [e.target.name]: e.target.files[0] }));

        } else if (e.target.name === 'thumbnail') {
            setFormData((prev) => ({ ...prev, [e.target.name]: e.target.files[0] }));
        } else {
            setFormData((prev) => ({ ...prev, uid: uid, [e.target.name]: e.target.value.trim() }));
        }
    };

    const getLength = (item) => {
        return item?.length > 0 ? true : false
    }

    const validate = () => {
        if (!getLength(formData.title)) {
            Notifications('warning', 'Title is required')
            return false;

        } else if (!getLength(formData.description)) {
            Notifications('warning', 'Description is required')
            return false;

        } else if (!getLength(formData.region)) {
            Notifications('warning', 'Region is required')
            return false;

        } else if (!formData.thumbnail) {
            Notifications('warning', 'Thumbnail is required')
            return false;

        } else if (!getLength(formData.categoryName)) {
            Notifications('warning', 'Category is required')
            return false;

        } else if (formData.categoryName === "talent") {
            if (showFiles.images && showFiles.video) {
                Notifications('warning', 'Select Images or Video')
                return false;
            } else if (showFiles.images) {
                if (!getLength(formData.talentImg)) {
                    Notifications('warning', 'Images are required')
                    return false;

                }
            } else if (showFiles.video) {
                if (!formData.asset) {
                    Notifications('warning', 'Video is required')
                    return false;

                }
            }
        } else if (formData.categoryName !== "talent") {
            if (showFiles.video) {
                if (!formData.asset) {
                    Notifications('warning', 'Video is required')
                    return false;
                }
            }
        }
        return true;
    }

    const uploadContent = async (e) => {
        e.preventDefault();
        const videoFormData = new FormData();
        videoFormData.append('uid', formData.uid);
        videoFormData.append('title', formData.title);
        videoFormData.append('description', formData.description);
        videoFormData.append('thumbnail', formData.thumbnail);
        videoFormData.append('categoryName', formData.categoryName);
        videoFormData.append('region', formData.region);

        if (validate()) {
            if (formData.categoryName === "talent" && showFiles.images) {
                formData['filetype'] = "img"
                videoFormData.append('filetype', 'img');
                for (let index = 0; index < formData.talentImg.length; index++) {
                    videoFormData.append('talentImg', formData.talentImg[index])
                }

                const res = await Api.uploadContent(videoFormData)
                if (res.status === 200) {
                    Notifications('success', 'Content Uploaded')
                    history.push('/admin/talent');
                }
            } else {
                formData['filetype'] = "video"
                videoFormData.append('filetype', 'video');
                videoFormData.append('asset', formData.asset);

                const res = await Api.uploadContent(videoFormData)
                if (res.status === 200) {
                    Notifications('success', 'Content Uploaded')
                    if (formData.categoryName === "music") {
                        history.push('/admin/music');
                    } else if (formData.categoryName === "comedy") {
                        history.push('/admin/comedy');
                    } else {
                        history.push('/admin/talent');
                    }
                }
            }
        }
    }

    return (
        <>
            <div className="card__header">
                <h4 className='card__title'>Add Content</h4>
            </div>
            <div className="card__body">
                <form onSubmit={uploadContent}>
                    <div className="upload__form_parent">
                        <div className="upload__form__child1">
                            <input
                                type="text"
                                placeholder='Title'
                                name='title'
                                onChange={setInputHandle}
                            />
                            <div className='select__wrapper'>
                                <div style={{ width: '100%' }}>
                                    <input
                                        type="file"
                                        id='thumbnail__file'
                                        name='thumbnail'
                                        style={{ display: 'none' }}
                                        onChange={setInputHandle}
                                        accept='.png,.jpg,.jpeg,.gif'
                                    />
                                    <label htmlFor="thumbnail__file" className='thumbnail__file'>
                                        <span>
                                            {formData.thumbnail?.name ? formData.thumbnail?.name : 'Upload Thumbnail'}
                                        </span>
                                        <i className='fa fa-images'></i>
                                    </label>
                                </div>
                                {formData.categoryName === "talent" && showFiles.images &&
                                    <>
                                        <div className='select__sep'></div>
                                        <div style={{ width: '100%' }}>
                                            <input
                                                type="file"
                                                id='multiple__file'
                                                name='talentImg'
                                                multiple
                                                onChange={setInputHandle}
                                                style={{ display: 'none' }}
                                                accept='.png,.jpg,.jpeg,.gif'
                                            />
                                            <label htmlFor="multiple__file" className='thumbnail__file'>
                                                <span>
                                                    {formData.talentImg?.name ? formData.talentImg?.name : 'Upload Images'}
                                                </span>
                                                <i className='fa fa-images'></i>
                                            </label>
                                        </div>
                                    </>
                                }
                            </div>
                            <div className='select__wrapper'>
                                <select
                                    name="categoryName"
                                    onChange={(e) => {
                                        setInputHandle(e)
                                        setShowFiles({ images: true, video: true })
                                    }}
                                >
                                    <option selected value="music">Music</option>
                                    <option value="comedy">Comedy</option>
                                    <option value="talent">Talent</option>
                                </select>
                                <div className='select__sep'></div>
                                <Region setInputHandle={setInputHandle} />
                            </div>
                            <textarea
                                name="description"
                                cols="30"
                                onChange={setInputHandle}
                                placeholder='Description'
                                rows="10"></textarea>
                        </div>
                        <div className="upload__form__child2">
                            {showFiles.video && <>
                                <input
                                    type="file"
                                    id='video__file'
                                    name='asset'
                                    onChange={setInputHandle}
                                    style={{ display: 'none' }}
                                    accept=".mp4,.mkev,.mkv"
                                />
                                <label htmlFor="video__file" className='video__file'>
                                    <span>
                                        {formData.asset?.name ? formData.asset?.name : 'Upload Video'}
                                    </span>
                                </label>
                            </>}
                        </div>
                    </div>
                    <div className="form__btn">
                        <button>Upload</button>
                    </div>
                </form>
            </div>
        </>
    )
}

const Region = ({ setInputHandle }) => {
    return (
        <select name="region" onChange={setInputHandle}>
            <option selected disabled>Choose Region</option>
            <option value="Afghanistan">Afghanistan</option>
            <option value="Åland Islands">Åland Islands</option>
            <option value="Albania">Albania</option>
            <option value="Algeria">Algeria</option>
            <option value="American Samoa">American Samoa</option>
            <option value="Andorra">Andorra</option>
            <option value="Angola">Angola</option>
            <option value="Anguilla">Anguilla</option>
            <option value="Antarctica">Antarctica</option>
            <option value="Antigua Barbuda">Antigua &amp; Barbuda</option>
            <option value="Argentina">Argentina</option>
            <option value="Armenia">Armenia</option>
            <option value="Aruba">Aruba</option>
            <option value="Australia">Australia</option>
            <option value="Austria">Austria</option>
            <option value="Azerbaijan">Azerbaijan</option>
            <option value="Bahamas">Bahamas</option>
            <option value="Bahrain">Bahrain</option>
            <option value="Bangladesh">Bangladesh</option>
            <option value="Barbados">Barbados</option>
            <option value="Belarus">Belarus</option>
            <option value="Belgium">Belgium</option>
            <option value="Belize">Belize</option>
            <option value="Benin">Benin</option>
            <option value="Bermuda">Bermuda</option>
            <option value="Bhutan">Bhutan</option>
            <option value="Bolivia">Bolivia</option>
            <option value="Bosnia Herzegovina">Bosnia &amp; Herzegovina</option>
            <option value="Botswana">Botswana</option>
            <option value="Bouvet Island">Bouvet Island</option>
            <option value="Brazil">Brazil</option>
            <option value="British Indian Ocean Territory">British Indian Ocean Territory</option>
            <option value="British Virgin Islands">British Virgin Islands</option>
            <option value="Brunei">Brunei</option>
            <option value="Bulgaria">Bulgaria</option>
            <option value="Burkina Faso">Burkina Faso</option>
            <option value="Burundi">Burundi</option>
            <option value="Cambodia">Cambodia</option>
            <option value="Cameroon">Cameroon</option>
            <option value="Canada">Canada</option>
            <option value="Cape Verde">Cape Verde</option>
            <option value="Caribbean Netherlands">Caribbean Netherlands</option>
            <option value="Cayman Islands">Cayman Islands</option>
            <option value="Central African Republic">Central African Republic</option>
            <option value="Chad">Chad</option>
            <option value="Chile">Chile</option>
            <option value="China">China</option>
            <option value="Christmas Island">Christmas Island</option>
            <option value="Cocos (Keeling) Islands">Cocos (Keeling) Islands</option>
            <option value="Colombia">Colombia</option>
            <option value="Comoros">Comoros</option>
            <option value="Congo - Brazzaville">Congo - Brazzaville</option>
            <option value="Congo - Kinshasa">Congo - Kinshasa</option>
            <option value="Cook Islands">Cook Islands</option>
            <option value="Costa Rica">Costa Rica</option>
            <option value="Côte d’Ivoire">Côte d’Ivoire</option>
            <option value="Croatia">Croatia</option>
            <option value="Cuba">Cuba</option>
            <option value="Curaçao">Curaçao</option>
            <option value="Cyprus">Cyprus</option>
            <option value="Czechia">Czechia</option>
            <option value="Denmark">Denmark</option>
            <option value="Djibouti">Djibouti</option>
            <option value="Dominica">Dominica</option>
            <option value="Dominican Republic">Dominican Republic</option>
            <option value="Ecuador">Ecuador</option>
            <option value="Egypt">Egypt</option>
            <option value="El Salvador">El Salvador</option>
            <option value="Equatorial Guinea">Equatorial Guinea</option>
            <option value="Eritrea">Eritrea</option>
            <option value="Estonia">Estonia</option>
            <option value="Eswatini">Eswatini</option>
            <option value="Ethiopia">Ethiopia</option>
            <option value="Falkland Islands">Falkland Islands</option>
            <option value="Faroe Islands">Faroe Islands</option>
            <option value="Fiji">Fiji</option>
            <option value="Finland">Finland</option>
            <option value="France">France</option>
            <option value="French Guiana">French Guiana</option>
            <option value="French Polynesia">French Polynesia</option>
            <option value="French Southern Territories">French Southern Territories</option>
            <option value="Gabon">Gabon</option>
            <option value="Gambia">Gambia</option>
            <option value="Georgia">Georgia</option>
            <option value="Germany">Germany</option>
            <option value="Ghana">Ghana</option>
            <option value="Gibraltar">Gibraltar</option>
            <option value="Greece">Greece</option>
            <option value="Greenland">Greenland</option>
            <option value="Grenada">Grenada</option>
            <option value="Guadeloupe">Guadeloupe</option>
            <option value="Guam">Guam</option>
            <option value="Guatemala">Guatemala</option>
            <option value="Guernsey">Guernsey</option>
            <option value="Guinea">Guinea</option>
            <option value="Guinea-Bissau">Guinea-Bissau</option>
            <option value="Guyana">Guyana</option>
            <option value="Haiti">Haiti</option>
            <option value="Heard McDonald Islands">Heard &amp; McDonald Islands</option>
            <option value="Honduras">Honduras</option>
            <option value="Hong Kong SAR China">Hong Kong SAR China</option>
            <option value="Hungary">Hungary</option>
            <option value="Iceland">Iceland</option>
            <option value="India">India</option>
            <option value="Indonesia">Indonesia</option>
            <option value="Iran">Iran</option>
            <option value="Iraq">Iraq</option>
            <option value="Ireland">Ireland</option>
            <option value="Isle of Man">Isle of Man</option>
            <option value="Israel">Israel</option>
            <option value="Italy">Italy</option>
            <option value="Jamaica">Jamaica</option>
            <option value="Japan">Japan</option>
            <option value="Jersey">Jersey</option>
            <option value="Jordan">Jordan</option>
            <option value="Kazakhstan">Kazakhstan</option>
            <option value="Kenya">Kenya</option>
            <option value="Kiribati">Kiribati</option>
            <option value="Kuwait">Kuwait</option>
            <option value="Kyrgyzstan">Kyrgyzstan</option>
            <option value="Laos">Laos</option>
            <option value="Latvia">Latvia</option>
            <option value="Lebanon">Lebanon</option>
            <option value="Lesotho">Lesotho</option>
            <option value="Liberia">Liberia</option>
            <option value="Libya">Libya</option>
            <option value="Liechtenstein">Liechtenstein</option>
            <option value="Lithuania">Lithuania</option>
            <option value="Luxembourg">Luxembourg</option>
            <option value="Macao SAR China">Macao SAR China</option>
            <option value="Madagascar">Madagascar</option>
            <option value="Malawi">Malawi</option>
            <option value="Malaysia">Malaysia</option>
            <option value="Maldives">Maldives</option>
            <option value="Mali">Mali</option>
            <option value="Malta">Malta</option>
            <option value="Marshall Islands">Marshall Islands</option>
            <option value="Martinique">Martinique</option>
            <option value="Mauritania">Mauritania</option>
            <option value="Mauritius">Mauritius</option>
            <option value="Mayotte">Mayotte</option>
            <option value="Mexico">Mexico</option>
            <option value="Micronesia">Micronesia</option>
            <option value="Moldova">Moldova</option>
            <option value="Monaco">Monaco</option>
            <option value="Mongolia">Mongolia</option>
            <option value="Montenegro">Montenegro</option>
            <option value="Montserrat">Montserrat</option>
            <option value="Morocco">Morocco</option>
            <option value="Mozambique">Mozambique</option>
            <option value="Myanmar (Burma)">Myanmar (Burma)</option>
            <option value="Namibia">Namibia</option>
            <option value="Nauru">Nauru</option>
            <option value="Nepal">Nepal</option>
            <option value="Netherlands">Netherlands</option>
            <option value="New Caledonia">New Caledonia</option>
            <option value="New Zealand">New Zealand</option>
            <option value="Nicaragua">Nicaragua</option>
            <option value="Niger">Niger</option>
            <option value="Nigeria">Nigeria</option>
            <option value="Niue">Niue</option>
            <option value="Norfolk Island">Norfolk Island</option>
            <option value="North Korea">North Korea</option>
            <option value="North Macedonia">North Macedonia</option>
            <option value="Northern Mariana Islands">Northern Mariana Islands</option>
            <option value="Norway">Norway</option>
            <option value="Oman">Oman</option>
            <option value="Pakistan">Pakistan</option>
            <option value="Palau">Palau</option>
            <option value="Palestinian Territories">Palestinian Territories</option>
            <option value="Panama">Panama</option>
            <option value="Papua New Guinea">Papua New Guinea</option>
            <option value="Paraguay">Paraguay</option>
            <option value="Peru">Peru</option>
            <option value="Philippines">Philippines</option>
            <option value="Pitcairn Islands">Pitcairn Islands</option>
            <option value="Poland">Poland</option>
            <option value="Portugal">Portugal</option>
            <option value="Puerto Rico">Puerto Rico</option>
            <option value="Qatar">Qatar</option>
            <option value="Réunion">Réunion</option>
            <option value="Romania">Romania</option>
            <option value="Russia">Russia</option>
            <option value="Rwanda">Rwanda</option>
            <option value="Samoa">Samoa</option>
            <option value="San Marino">San Marino</option>
            <option value="São Tomé Príncipe">São Tomé &amp; Príncipe</option>
            <option value="Saudi Arabia">Saudi Arabia</option>
            <option value="Senegal">Senegal</option>
            <option value="Serbia">Serbia</option>
            <option value="Seychelles">Seychelles</option>
            <option value="Sierra Leone">Sierra Leone</option>
            <option value="Singapore">Singapore</option>
            <option value="Sint Maarten">Sint Maarten</option>
            <option value="Slovakia">Slovakia</option>
            <option value="Slovenia">Slovenia</option>
            <option value="Solomon Islands">Solomon Islands</option>
            <option value="Somalia">Somalia</option>
            <option value="South Africa">South Africa</option>
            <option value="South Georgia South Sandwich Islands">South Georgia &amp; South Sandwich Islands</option>
            <option value="South Korea">South Korea</option>
            <option value="South Sudan">South Sudan</option>
            <option value="Spain">Spain</option>
            <option value="Sri Lanka">Sri Lanka</option>
            <option value="St. Barthélemy">St. Barthélemy</option>
            <option value="St. Helena">St. Helena</option>
            <option value="St. Kitts Nevis">St. Kitts &amp; Nevis</option>
            <option value="St. Lucia">St. Lucia</option>
            <option value="St. Martin">St. Martin</option>
            <option value="St. Pierre Miquelon">St. Pierre &amp; Miquelon</option>
            <option value="St. Vincent Grenadines">St. Vincent &amp; Grenadines</option>
            <option value="Sudan">Sudan</option>
            <option value="Suriname">Suriname</option>
            <option value="Svalbard Jan Mayen">Svalbard &amp; Jan Mayen</option>
            <option value="Sweden">Sweden</option>
            <option value="Switzerland">Switzerland</option>
            <option value="Syria">Syria</option>
            <option value="Taiwan">Taiwan</option>
            <option value="Tajikistan">Tajikistan</option>
            <option value="Tanzania">Tanzania</option>
            <option value="Thailand">Thailand</option>
            <option value="Timor-Leste">Timor-Leste</option>
            <option value="Togo">Togo</option>
            <option value="Tokelau">Tokelau</option>
            <option value="Tonga">Tonga</option>
            <option value="Trinidad Tobago">Trinidad &amp; Tobago</option>
            <option value="Tunisia">Tunisia</option>
            <option value="Turkey">Turkey</option>
            <option value="Turkmenistan">Turkmenistan</option>
            <option value="Turks Caicos Islands">Turks &amp; Caicos Islands</option>
            <option value="Tuvalu">Tuvalu</option>
            <option value="U.S. Outlying Islands">U.S. Outlying Islands</option>
            <option value="U.S. Virgin Islands">U.S. Virgin Islands</option>
            <option value="Uganda">Uganda</option>
            <option value="Ukraine">Ukraine</option>
            <option value="United Arab Emirates">United Arab Emirates</option>
            <option value="United Kingdom">United Kingdom</option>
            <option value="United States">United States</option>
            <option value="Uruguay">Uruguay</option>
            <option value="Uzbekistan">Uzbekistan</option>
            <option value="Vanuatu">Vanuatu</option>
            <option value="Vatican City">Vatican City</option>
            <option value="Venezuela">Venezuela</option>
            <option value="Vietnam">Vietnam</option>
            <option value="Wallis Futuna">Wallis &amp; Futuna</option>
            <option value="Western Sahara">Western Sahara</option>
            <option value="Yemen">Yemen</option>
            <option value="Zambia">Zambia</option>
            <option value="Zimbabwe">Zimbabwe</option>
        </select>
    )
}
export default Upload