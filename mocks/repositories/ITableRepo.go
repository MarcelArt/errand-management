// Code generated by mockery v2.51.1. DO NOT EDIT.

package repositories

import mock "github.com/stretchr/testify/mock"

// ITableRepo is an autogenerated mock type for the ITableRepo type
type ITableRepo struct {
	mock.Mock
}

type ITableRepo_Expecter struct {
	mock *mock.Mock
}

func (_m *ITableRepo) EXPECT() *ITableRepo_Expecter {
	return &ITableRepo_Expecter{mock: &_m.Mock}
}

// GetTables provides a mock function with no fields
func (_m *ITableRepo) GetTables() ([]string, error) {
	ret := _m.Called()

	if len(ret) == 0 {
		panic("no return value specified for GetTables")
	}

	var r0 []string
	var r1 error
	if rf, ok := ret.Get(0).(func() ([]string, error)); ok {
		return rf()
	}
	if rf, ok := ret.Get(0).(func() []string); ok {
		r0 = rf()
	} else {
		if ret.Get(0) != nil {
			r0 = ret.Get(0).([]string)
		}
	}

	if rf, ok := ret.Get(1).(func() error); ok {
		r1 = rf()
	} else {
		r1 = ret.Error(1)
	}

	return r0, r1
}

// ITableRepo_GetTables_Call is a *mock.Call that shadows Run/Return methods with type explicit version for method 'GetTables'
type ITableRepo_GetTables_Call struct {
	*mock.Call
}

// GetTables is a helper method to define mock.On call
func (_e *ITableRepo_Expecter) GetTables() *ITableRepo_GetTables_Call {
	return &ITableRepo_GetTables_Call{Call: _e.mock.On("GetTables")}
}

func (_c *ITableRepo_GetTables_Call) Run(run func()) *ITableRepo_GetTables_Call {
	_c.Call.Run(func(args mock.Arguments) {
		run()
	})
	return _c
}

func (_c *ITableRepo_GetTables_Call) Return(_a0 []string, _a1 error) *ITableRepo_GetTables_Call {
	_c.Call.Return(_a0, _a1)
	return _c
}

func (_c *ITableRepo_GetTables_Call) RunAndReturn(run func() ([]string, error)) *ITableRepo_GetTables_Call {
	_c.Call.Return(run)
	return _c
}

// NewITableRepo creates a new instance of ITableRepo. It also registers a testing interface on the mock and a cleanup function to assert the mocks expectations.
// The first argument is typically a *testing.T value.
func NewITableRepo(t interface {
	mock.TestingT
	Cleanup(func())
}) *ITableRepo {
	mock := &ITableRepo{}
	mock.Mock.Test(t)

	t.Cleanup(func() { mock.AssertExpectations(t) })

	return mock
}
