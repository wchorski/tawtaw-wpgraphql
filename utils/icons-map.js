/**
 * Icons Component map.
 *
 * @param {string} name Icon Name.
 * @returns {*}
 */
 import {AiFillFacebook, AiFillTwitterSquare, AiOutlineInstagram, AiFillYoutube} from 'react-icons/ai'

 export const getIconComponentByName = ( name ) => {
	const ComponentsMap = {
		// facebook: 'fccbkk',
		// twitter: 'twwwwiter',
		// instagram: 'instaaa',
		// youtube: 'youtubbb'
		facebook: <AiFillFacebook />,
		twitter: <AiFillTwitterSquare />,
		instagram: <AiOutlineInstagram />,
		youtube: <AiFillYoutube />
	};

  return ComponentsMap[name]
	
	if ( name in ComponentsMap ) {
		const IconComponent = ComponentsMap[name];
		return <IconComponent />;
	} else {
		return null;
	}
};