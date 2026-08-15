export const exportRfqsToCsv = (data = [], filename = 'mahi_controls_rfq_backup') => {
  const records = Array.isArray(data) ? data : [];

  if (records.length === 0) {
    alert('No inquiries or lead records available to export.');
    return;
  }

  const headers = [
    'RFQ ID',
    'Date Received',
    'Company Name',
    'Contact Person',
    'Email',
    'Phone',
    'Location',
    'Pipeline Status',
    'Items Count',
    'Requested Products',
    'Customer Notes'
  ];

  const rows = records.map((item) => {
    const rfqId = item?.id || item?._id || '';
    const date = item?.createdAt 
      ? new Date(item.createdAt).toLocaleString() 
      : (item?.dateReceived || item?.date || '');
    const company = item?.companyName || item?.company || 'N/A';
    const contact = item?.contactPerson || item?.fullName || item?.contact || item?.name || '';
    const email = item?.email || item?.workEmail || '';
    const phone = item?.phone || item?.phoneNumber || item?.mobile || '';
    const location = item?.location || item?.city || '';
    const status = item?.status || 'NEW';

    let itemsCount = 1;
    let products = '';
    if (Array.isArray(item?.items) && item.items.length > 0) {
      itemsCount = item.items.length;
      products = item.items.map(i => `${i?.productName || i?.name || 'Item'} (Qty: ${i?.quantity || 1})`).join('; ');
    } else {
      products = item?.productsRequested || item?.product || item?.productName || '';
    }

    const notes = item?.notes || item?.message || item?.description || '';

    return [
      `"${String(rfqId).replace(/"/g, '""')}"`,
      `"${String(date).replace(/"/g, '""')}"`,
      `"${String(company).replace(/"/g, '""')}"`,
      `"${String(contact).replace(/"/g, '""')}"`,
      `"${String(email).replace(/"/g, '""')}"`,
      `"${String(phone).replace(/"/g, '""')}"`,
      `"${String(location).replace(/"/g, '""')}"`,
      `"${String(status).replace(/"/g, '""')}"`,
      `"${itemsCount}"`,
      `"${String(products).replace(/"/g, '""')}"`,
      `"${String(notes).replace(/"/g, '""')}"`
    ].join(',');
  });

  const csvContent = '\uFEFF' + [headers.join(','), ...rows].join('\r\n');
  const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
  const url = URL.createObjectURL(blob);
  
  const link = document.createElement('a');
  link.href = url;
  link.setAttribute('download', `${filename}_${new Date().toISOString().split('T')[0]}.csv`);
  document.body.appendChild(link);
  link.click();
  
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
};
