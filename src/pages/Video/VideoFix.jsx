import React, { useRef, useEffect } from 'react';
import PropTypes from 'prop-types';

/*
  The 'video' tag cannot be used directly in React because we cannot set its srcObject attribute
  See https://github.com/facebook/react/issues/11163 for more details
  Hence VideoFix component, a simple wrapper around the 'video' tag
*/
export const VideoFix = ({ srcObject, ...rest }) => {
  const el = useRef(null);
  useEffect(() => {
    if (el.current) {
      el.current.srcObject = srcObject;
    }
  }, [el.current]); // eslint-disable-line react-hooks/exhaustive-deps

  // eslint-disable-next-line jsx-a11y/media-has-caption
  return <video ref={el} {...rest} />;
};

VideoFix.propTypes = {
  srcObject: PropTypes.object.isRequired,
};

export default VideoFix;
