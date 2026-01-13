export const createMockComponent = (componentName: string) => {
  return {
    name: componentName,
    template: `<div>${componentName} Mock</div>`,
    selector: `app-${componentName.toLowerCase()}-mock`,
  };
};

export const createMockService = (serviceName: string) => {
  return {
    provide: serviceName,
    useValue: {
      getData: () => {},
      setData: () => {},
    },
  };
};

export const expectValidComponent = (component: any) => {
  if (!component) {
    throw new Error('Component is undefined');
  }
  return true;
};
