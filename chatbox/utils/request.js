export function prepareDashbaordHostname(h) {
    return [h.subdomain, 'dashboard', h.domain, h.tld].join('.');
}

export const apiEndpointBase = '/api/v1/'; // For Dashboard's Base
export const botApiEndpointBase = '/api/'; // For Bot's Base
export const protocol = 'https:';
export const hostname = window.location.hostname; // For Bot's API url
export const currentHostname = window.location.hostname.toString(); // For Dashboard's API url
export const parsedHostname = parseDomain(currentHostname)
  ? parseDomain(currentHostname)
  : {
      subdomain: '',
      domain: '',
      tld: '',
    };
export const dashboardHostname = prepareDashbaordHostname(parsedHostname);
