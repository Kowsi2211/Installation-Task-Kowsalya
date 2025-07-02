// Copyright (c) 2025, Kowsalya and contributors
// For license information, please see license.txt

frappe.ui.form.on("Installation Request", {
    refresh:function(frm){
        if(frm.doc.workflow_state == "Submit for approval" && frappe.user.has_role("Installation Request Approver")){
            frm.add_custom_button("Schedule Installation",()=>{
                frm.set_value("status","Scheduled")
                frm.save()
            })
        }
    },
    delivery_note:function(frm) {
        frappe.call({
            method: 'installation_kowsalya.installation_kowsalya.doctype.installation_request.installation_request.value',
            args: {
                'value': frm.doc.delivery_note,
            },
            callback: function(r) {
                console.log(r.message.technician);
                let items = r.message.items;

                frm.clear_table("installation_items");

                items.forEach(row => {
                    frm.add_child("installation_items", {
                        item_code: row.item_code,
                        quantity: row.qty
                    });
                });

                frm.refresh_field("installation_items");
                
            }
        });
        frappe.call({
            method: 'installation_kowsalya.installation_kowsalya.doctype.installation_request.installation_request.technician',
            args: {
                'customer':frm.doc.customer
            },
            callback: function(r) {
                frm.set_value("assigned_technician",r.message.preferred_technician)
            }
        })
    },

    validate: function(frm) {
        let total_quantity = 0;

        frm.doc.installation_items.forEach(row => {
            total_quantity += row.quantity;
        });
        frm.set_value("total_quantity", total_quantity);
        if(frm.doc.total_quantity > 10){
            frappe.show_alert("Total quantity is more than 10")
        }
        
    },
   
});


