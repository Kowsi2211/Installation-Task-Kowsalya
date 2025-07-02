# Copyright (c) 2025, kowsalya and contributors
# For license information, please see license.txt

import frappe
from frappe.model.document import Document


class InstallationRequest(Document):

	pass

@frappe.whitelist()
def value(value):
	item = frappe.get_doc("Delivery Note",value,"items")
	return item
@frappe.whitelist()
def technician(customer):
	technician = frappe.get_doc("Installation Zone",customer,"preferred_technician")
	return technician

