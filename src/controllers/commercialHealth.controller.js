import commercialHealthModel from "../models/commercialHealth.model";

const commercialHealthController = () => {
    const create = async (req, res, next) => {
        try {
            const data = { projectId: req.body.projectId }
            const newDoc = await commercialHealthController.create(data);
            if (newDoc) {
                req.apiStatus = {
                    isSuccess: true,
                    customMsg: 'success',
                    data: newDoc,
                }
            } else {
                req.apiStatus = {
                    isSuccess: true,
                    customMsg: 'Unable to create',
                    data: {},
                }
            }
            next();
        } catch (error) {
            req.apiStatus = {
                isSuccess: true,
                customMsg: 'Unable to create',
                error: error,
            }
            next();
        }
    }

    const updateByProjectId = async (req, res, next) => {
        const {
            projectId,
            all_invoices_raised,
            all_invoices_paid,
            original_vs_actual_effort,
            sow,
            timesheet,
            shadow,
            actual_sow,
            percentage_sow,
            burn_rate
        } = req.body;
        if (projectId) {
            const data = {};
            if (all_invoices_raised) data.all_invoices_raised = all_invoices_raised;
            if (all_invoices_paid) data.all_invoices_paid = all_invoices_paid;
            if (original_vs_actual_effort) data.original_vs_actual_effort = original_vs_actual_effort;
            if (sow) data.sow = sow;
            if (timesheet) data.timesheet = timesheet;
            if (shadow) data.shadow = shadow;
            if (actual_sow) data.actual_sow = actual_sow;
            if (percentage_sow) data.percentage_sow = percentage_sow;
            if (burn_rate) data.burn_rate = burn_rate;
        } else {
            req.apiStatus = {
                isSuccess: false,
                customMsg: 'project Id is required',
            }
            next();
        }
    }

    return {
        create,
        updateByProjectId,
    }
}