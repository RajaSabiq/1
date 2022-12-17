import * as React from 'react';
import Backdrop from '@mui/material/Backdrop';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Fade from '@mui/material/Fade';
import Typography from '@mui/material/Typography';

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 3,
};

export default function ShareModal({ open, handleClose, aid }) {
    return (
        <div>
            <Modal
                aria-labelledby="transition-modal-title"
                aria-describedby="transition-modal-description"
                open={open}
                onClose={handleClose}
                closeAfterTransition
                BackdropComponent={Backdrop}
                BackdropProps={{
                    timeout: 500,
                }}
            >
                <Fade in={open}>
                    <Box sx={style} className={"share__modal"}>
                        <Typography id="transition-modal-title" variant="h5" component="h2">
                            Share
                        </Typography>
                        <div className="social-btn-sp">
                            <div id="social-links">
                                <ul>
                                    <li><a href="https://www.facebook.com/sharer/sharer.php?u=https://art.2spice.link/single-content/2"
                                        className="social-button " id="" title="" rel=""><span
                                            className="fab fa-facebook-square"></span></a></li>
                                    <li><a href="https://twitter.com/intent/tweet?text=Maroon+5+-+Memories+%28Lyrics%29++Shape+of+You%2CLeave+The+Door+Open&amp;url=https://art.2spice.link/single-content/2"
                                        className="social-button " id="" title="" rel=""><span
                                            className="fab fa-twitter"></span></a></li>
                                    <li><a href="https://www.linkedin.com/sharing/share-offsite?mini=true&amp;url=https://art.2spice.link/single-content/2&amp;title=Maroon+5+-+Memories+%28Lyrics%29++Shape+of+You%2CLeave+The+Door+Open&amp;summary="
                                        className="social-button " id="" title="" rel=""><span
                                            className="fab fa-linkedin"></span></a></li>
                                    <li><a target="_blank"
                                        href="https://telegram.me/share/url?url=https://art.2spice.link/single-content/2&amp;text=Maroon+5+-+Memories+%28Lyrics%29++Shape+of+You%2CLeave+The+Door+Open"
                                        className="social-button " id="" title="" rel=""><span
                                            className="fab fa-telegram"></span></a></li>
                                    <li><a target="_blank"
                                        href="https://wa.me/?text=https://art.2spice.link/single-content/2"
                                        className="social-button " id="" title="" rel=""><span
                                            className="fab fa-whatsapp"></span></a></li>
                                    <li><a target="_blank"
                                        href="https://www.reddit.com/submit?title=Maroon+5+-+Memories+%28Lyrics%29++Shape+of+You%2CLeave+The+Door+Open&amp;url=https://art.2spice.link/single-content/2"
                                        className="social-button " id="" title="" rel=""><span
                                            className="fab fa-reddit"></span></a></li>
                                </ul>
                            </div>
                        </div>
                    </Box>
                </Fade>
            </Modal>
        </div>
    );
}
