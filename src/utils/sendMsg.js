export const sendRes = (res, data, msg = "Success",status) => res.status(status).json({ success: true, data, msg });

export const sendCreate = (res, msg = "Success") => res.status(201).json({ success: true, data, msg });
