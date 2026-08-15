export const exportRfqsToCsv = (rfqs = [], filename = 'mahi_controls_rfq_backup.csv') => {
  if (!rfqs || rfqs.length === 0) {
    alert('No data available to export.');
    return;
  }

  // Define CSV Column Headers
  const headers = [
    'RFQ ID',
    'Date Submitted',
    'Company Name',
    'Contact Person',
    'Email Address',
    'Phone Number',
    'City / Location',
    'Pipeline Status',
    'Items Count',
    'Items Requested (Summary)',
    'Customer Notes'
  ];

  // Map rows safely escaping commas & linebreaks
  const rows = rfqs.map((rfq) => {
    const itemsSummary = Array.isArray(rfq.items)
      ? rfq.items.map((i) => `${i.productName || 'Item'} (Qty: ${i.quantity || 1})`).join('; ')
      : (rfq.productsRequested || '');

    return [
      `"${rfq.id || ''}"`,
      `"${rfq.createdAt ? new Date(rfq.createdAt).toLocaleDateString() : ''}"`,
      `"${(rfq.companyName || '').replace(/"/g, '""')}"`,
      `"${(rfq.contactPerson || rfq.fullName || '').replace(/"/g, '""')}"`,
      `"${(rfq.email || '').replace(/"/g, '""')}"`,
      `"${(rfq.phone || '').replace(/"/g, '""')}"`,
      `"${(rfq.location || rfq.city || '').replace(/"/g, '""')}"`,
      `"${(rfq.status || 'NEW').replace(/"/g, '""')}"`,
      `"${Array.isArray(rfq.items) ? rfq.items.length : 1}"`,
      `"${itemsSummary.replace(/"/g, '""')}"`,
      `"${(rfq.notes || rfq.message || '').replace(/"/g, '""')}"`
    ].join(',');
  });

  const csvContent = 'data:text/csv;charset=utf-8,\uFEFF' + [headers.join(','), ...rows].join('\n');
  const encodedUri = encodeURI(csvContent);
  const link = document.createElement('a');
  link.setAttribute('href', encodedUri);
  link.setAttribute('download', `${filename}_${new Date().toISOString().split('T')[0]}.csv`);
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
};
